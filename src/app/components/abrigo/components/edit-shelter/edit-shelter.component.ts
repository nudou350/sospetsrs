import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ShelterService } from '../../../../core/services/shelter.service';
import { ToastService } from '../../../../core/services/toast.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CapitalPipe } from '../../../../core/pipes/capital.pipe';

@Component({
  selector: 'app-edit-shelter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CapitalPipe
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
  user = inject(AuthService).user
  canEdit = computed(()=> this.user().role == 'admin' || this.user().role == 'volunteer')
  needs = ['água', 'ração', 'remédios', 'roupinhas', 'coleiras', 'itens de higiene', 'fraldas', 'colchonetes', 'ajuda financeira', 'tapete higiênico', 'sachê para cachorro', 'sachê para gato', 'veterinário local', 'veterinário online','voluntário']
  selectedNeeds = signal<string[]>([])
  dataReady = signal<boolean>(false)
  shelterId = parseInt(this.#activatedRoute.snapshot.params['id']);

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

  toastService = inject(ToastService)

  @ViewChild('successTpl') successTpl!: TemplateRef<any>;
  @ViewChild('errorTpl') errorTpl!: TemplateRef<any>;


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

  updateList(item: string) {
    console.log(item)
    if (this.selectedNeeds().includes(item)) {
      const newList = this.selectedNeeds().filter(need => need !== item)
      this.selectedNeeds.set(newList)
      this.shelterForm.controls.needs.setValue(newList);
    } else {
      this.selectedNeeds.update(need => [...need, item])
    }
  }

  updateShelter(): void {
    const shelterId = parseInt(this.#activatedRoute.snapshot.params['id']);
    let shelter = this.shelterForm.getRawValue();
    if(!shelter.address) shelter.address = 'Entre em contato';
    shelter.needs = this.selectedNeeds();
    this.#shelterService.updateShelter(shelterId, shelter).subscribe({
      next: () => {
        this.toastService.show({ template: this.successTpl, classname: "text-white bg-success p-2" });
        this.#router.navigateByUrl('/abrigos')
      }, error: (err) => {
        this.toastService.show({ template: this.errorTpl, classname: "text-white bg-danger p-2" });
      }

    });
  }

  formatPhone(phone: string) {
    return phone.replace(/\D/g, '');
  }
}
