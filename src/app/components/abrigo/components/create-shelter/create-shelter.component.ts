import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ShelterService } from '../../../../core/services/shelter.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CapitalPipe } from '../../../../core/pipes/capital.pipe';

@Component({
  selector: 'app-create-shelter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CapitalPipe
  ],
  templateUrl: './create-shelter.component.html',
  styleUrl: './create-shelter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateShelterComponent {
  needs = ['Água','Ração', 'Remédios', 'Roupinhas', 'Coleiras', 'Itens de higiene', 'Fraldas','Colchonetes','Ajuda financeira','Tapete Higiênico','Sachê para cachorro', 'Sachê para gato','veterinário local', 'veterinário online','voluntário']
  selectedNeeds = signal<string[]>([])
  #fb = inject(FormBuilder)
  #router = inject(Router)
  #shelterService = inject(ShelterService)
  form = this.#fb.nonNullable.group({
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

  updateList(item: string){
    console.log(item)
    if(this.selectedNeeds().includes(item)){
      const newList = this.selectedNeeds().filter(need => need !== item)
      this.selectedNeeds.set(newList)
      this.form.controls.needs.setValue(newList)
    }else{
      this.selectedNeeds.update(need => [...need, item])
      this.form.controls.needs.setValue([...this.selectedNeeds()])
    }
  }

  register(){
    if(!this.form.controls.address.value) this.form.controls.address.setValue('Entre em contato')
      return confirm('Deseja realmente cadastrar esse abrigo?') &&
      this.#shelterService.createShelter(this.form.getRawValue()).subscribe({
        next:()=>{
          this.toastService.show({ template: this.successTpl, classname:"text-white bg-success p-2" });
          this.#router.navigateByUrl('/abrigos')
        },error:()=>{
          this.toastService.show({ template: this.errorTpl, classname:"text-white bg-danger p-2" });
        }
      })

  }

}
