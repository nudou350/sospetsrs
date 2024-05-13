import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ShelterService } from '../../../../core/services/shelter.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-edit-shelter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './edit-shelter.component.html',
  styleUrl: './edit-shelter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditShelterComponent implements OnInit {
  needs = ['água', 'ração', 'remédios', 'roupinhas', 'coleiras', 'itens de higiene', 'fraldas', 'colchonetes', 'ajuda financeira', 'tapete higiênico', 'sachê para cachorro', 'sachê para gato']
  selectedNeeds = signal<string[]>([])
  dataReady = signal<boolean>(false)

  #shelterService = inject(ShelterService)
  #activatedRoute = inject(ActivatedRoute)
  #fb = inject(FormBuilder)
  #router = inject(Router)
  shelterId = parseInt(this.#activatedRoute.snapshot.params['id']);

  shelterForm = this.#fb.nonNullable.group({
    location: ['',  Validators.required],
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
  @ViewChild('deleteTpl') deleteTpl!: TemplateRef<any>;


  ngOnInit(): void {
    this.#shelterService.getShelterById(this.shelterId).subscribe(shelter => {
      this.shelterForm.patchValue(shelter);
      this.shelterForm.controls.needs.setValue(shelter.needs);
      this.selectedNeeds.set(shelter.needs);
      this.dataReady.set(true);
    });
  }

  updateList(item: string){
    console.log(item)
    if(this.selectedNeeds().includes(item)){
      const newList = this.selectedNeeds().filter(need => need !== item)
      this.selectedNeeds.set(newList)
      this.shelterForm.controls.needs.setValue(newList);
    }else{
      this.selectedNeeds.update(need => [...need, item])
    }
  }

  updateShelter() : void {
    const shelterId = parseInt(this.#activatedRoute.snapshot.params['id']);
    let shelter = this.shelterForm.getRawValue();
    shelter.needs = this.selectedNeeds();
    this.#shelterService.updateShelter(shelterId, shelter).subscribe({
      next:()=>{
        this.toastService.show({ template: this.successTpl, classname:"text-white bg-success p-2" });
        this.#router.navigateByUrl('/abrigos')
      },error:()=>{
        this.toastService.show({ template: this.errorTpl, classname:"text-white bg-danger p-2" });
      }

    });
  }
  deleteShelter(){
    const shelterId = parseInt(this.#activatedRoute.snapshot.params['id']);
    this.#shelterService.deleteShelter(shelterId).subscribe({
      next:  ()=> {
        this.toastService.show({ template: this.deleteTpl, classname:"text-white bg-success p-2" });
        this.#router.navigateByUrl('/abrigos')
      }
    })
  }
 }
