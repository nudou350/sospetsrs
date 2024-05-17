import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ShelterService } from '../../../../core/services/shelter.service';
import { ToastService } from '../../../../core/services/toast.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CapitalPipe } from '../../../../core/pipes/capital.pipe';
import { OperatorFunction, Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { CreateShelterComponent } from '../create-shelter/create-shelter.component';
import { RSCitiesDto } from '../../../../shared/dtos/cities.dto';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-shelter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CapitalPipe,
    FormsModule,
    NgbTypeaheadModule
  ],
  templateUrl: './edit-shelter.component.html',
  styleUrl: './edit-shelter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditShelterComponent implements OnInit {
  #shelterService = inject(ShelterService)
  #activatedRoute = inject(ActivatedRoute)
  #fb = inject(FormBuilder)
  #router = inject(Router)
  #toastService = inject(ToastService)
  user = inject(AuthService).user
  canEdit = computed(()=> this.user().role == 'admin' || this.user().role == 'volunteer')
  needs = ['água', 'ração', 'remédios', 'roupinhas', 'coleiras', 'itens de higiene', 'fraldas', 'colchonetes', 'ajuda financeira', 'tapete higiênico', 'sachê para cachorro', 'sachê para gato', 'veterinário local', 'veterinário online','voluntário']
  selectedNeeds = signal<string[]>([])
  dataReady = signal<boolean>(false)
  shelterId = parseInt(this.#activatedRoute.snapshot.params['id']);
  cities = RSCitiesDto
  model:any
  shelterForm = this.#fb.nonNullable.group({
    location: ['', Validators.required],
    address: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    capacity: [0, [Validators.required, Validators.min(1)]],
    occupation: [0, [Validators.required, Validators.min(0)]],
    owner: ['', Validators.required],
    needs: [['']],
    other_needs: ['']
  });

  @ViewChild('successTpl') successTpl!: TemplateRef<any>;
  @ViewChild('errorTpl') errorTpl!: TemplateRef<any>;
  @ViewChild('capacityTpl') capacityTpl!: TemplateRef<any>;

constructor(){
  effect(()=> {
    return (this.user().role!== 'admin' && this.user().role!=='volunteer') ?  this.shelterForm.disable(): this.shelterForm.enable()
  })
}
  ngOnInit(): void {
    //if we access from the abrigos page, we already have the shelter in the list, so no need to download the data
    const currentShelter = this.#shelterService.shelters().find(shelter => shelter.id === this.shelterId);
    if (currentShelter) {
      this.shelterForm.patchValue(currentShelter);
      this.shelterForm.controls.needs.setValue(currentShelter.needs);
      this.selectedNeeds.set(currentShelter.needs);
      this.model = currentShelter.location;
      this.dataReady.set(true);
    }
    //if we access from the edit page directly, we need to download the data
    else {
      this.#shelterService.getShelterById(this.shelterId).subscribe(shelter => {
        this.shelterForm.patchValue(shelter);
        this.shelterForm.controls.needs.setValue(shelter.needs);
        this.selectedNeeds.set(shelter.needs);
        this.dataReady.set(true);
      });
    }
  }

  private static removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => {
        const sanitizedTerm = EditShelterComponent.removeAccents(term).toLowerCase();
        return sanitizedTerm.length < 2
          ? []
          : this.cities
              .filter((v) => EditShelterComponent.removeAccents(v).toLowerCase().indexOf(sanitizedTerm) > -1)
              .slice(0, 10)
      })
    );
  updateList(item: string) {
    if (this.selectedNeeds().includes(item)) {
      const newList = this.selectedNeeds().filter(need => need !== item)
      this.selectedNeeds.set(newList)
      this.shelterForm.controls.needs.setValue(newList);
    } else {
      this.selectedNeeds.update(need => [...need, item])
    }
  }

  updateShelter(): void {
    if(!this.cities.includes(this.model)){
      this.#toastService.showError("Cidade não encontrada. Verifique a localização!");
      return
    }

    //check if occupation is bigger than capacity
    if (this.shelterForm.controls.occupation.value > this.shelterForm.controls.capacity.value) {
      this.#toastService.showError("O número de Pets não pode ser maior que a capacidade do abrigo!"); 
      return;
    }
    const shelterId = parseInt(this.#activatedRoute.snapshot.params['id']);
    let shelter = this.shelterForm.getRawValue();
    if(!shelter.address) shelter.address = 'Entre em contato';
    shelter.needs = this.selectedNeeds();
    this.#shelterService.updateShelter(shelterId, shelter).subscribe({
      next: () => {
        // this.toastService.show({ template: this.successTpl, classname: "text-white bg-success p-2" });
        this.#toastService.showSuccess("Abrigo editado com sucesso!");
        this.#router.navigateByUrl('/abrigos')
      }, error: (err) => {
        this.#toastService.showError("Erro ao editar abrigo!"); 
      }

    });
  }

  formatPhone(phone: string) {
    return phone.replace(/\D/g, '');
  }
}
