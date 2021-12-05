import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created  by <b><a href="https://www.himaya.ma/" target="_blank">Himaya.ma</a></b> 2022
    </span>
    <div class="socials">
      <a href="https://www.facebook.com/Himaya.defibmaghreb/" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://www.linkedin.com/company/himaya-ma/?originalSubdomain=ma" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
