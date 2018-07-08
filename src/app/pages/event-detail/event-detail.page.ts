import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  public currentEvent: any = {};
  public guestName: string;
  public guestPicture: string = null;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const eventId: string = this.route.snapshot.paramMap.get('id');
    this.eventService.getEventDetail(eventId).on('value', eventSnapshot => {
      this.currentEvent = eventSnapshot.val();
      this.currentEvent.id = eventSnapshot.key;
    });
  }

  addGuest(guestName: string): void {
    this.eventService
      .addGuest(
        guestName,
        this.currentEvent.id,
        this.currentEvent.price,
        this.guestPicture
      )
      .then( () => {
        this.guestName = '';
        this.guestPicture = null;
      });
  }

  takePicture(): void {
    /* this.cameraPlugin
      .getPicture({
        quality: 95,
        destinationType: this.cameraPlugin.DestinationType.DATA_URL,
        sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: this.cameraPlugin.EncodingType.PNG,
        saveToPhotoAlbum: true,
      })
      .then(
        imageData => {
          this.guestPicture = imageData;
        },
        error => {
          console.log('ERROR -> ' + JSON.stringify(error));
        }
      );
  } */
}
