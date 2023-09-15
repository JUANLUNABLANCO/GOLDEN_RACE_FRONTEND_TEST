import { Component } from '@angular/core';

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.less']
})
export class CardImageComponent {
  cardImages = [
    {
      url: 'assets/images/image-a.png',
      title: 'Imagen A',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget vulputate odio. Nullam at odio nec ex lacinia iaculis. Vivamus aliquet mi in nulla pharetra, a dignissim turpis hendrerit. Sed sollicitudin malesuada nisl, non pellentesque odio tincidunt vel. In hac habitasse platea dictumst. Fusce euismod sapien a quam vehicula, sed semper velit tincidunt. Aliquam erat volutpat. Maecenas a tincidunt mauris. Sed eleifend tincidunt leo, a dignissim felis. Donec bibendum lectus libero, nec malesuada libero facilisis ut. Cras ut rhoncus ligula. Nullam ac vestibulum ex. Eres bígamo wei! Praesent vehicula diam eu turpis aliquet, non tincidunt augue dictum. Vivamus at risus eget tortor fermentum laoreet. '
    },
    {
      url: 'assets/images/image-b.png',
      title: 'Imagen B',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget vulputate odio. Nullam at odio nec ex lacinia iaculis. Vivamus aliquet mi in nulla pharetra, a dignissim turpis hendrerit. Sed sollicitudin malesuada nisl, non pellentesque odio tincidunt vel. In hac habitasse platea dictumst. Fusce euismod sapien a quam vehicula, sed semper velit tincidunt. Aliquam erat volutpat. Maecenas a tincidunt mauris. Sed eleifend tincidunt leo, a dignissim felis. Donec bibendum lectus libero, nec malesuada libero facilisis ut. Cras ut rhoncus ligula. Nullam ac vestibulum ex. Eres bígamo wei! Praesent vehicula diam eu turpis aliquet, non tincidunt augue dictum. Vivamus at risus eget tortor fermentum laoreet. '
    }
  ]
}
