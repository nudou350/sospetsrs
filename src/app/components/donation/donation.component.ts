import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonationComponent {
  donationCode = "doe@gradbrasil.org.brr";

  copyCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      alert('Código copiado com sucesso!');
    })
    .catch(err => {
      console.error('Falha ao copiar o código:', err);
    });
  }
}
