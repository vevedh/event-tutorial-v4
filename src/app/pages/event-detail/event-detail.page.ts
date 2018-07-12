import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { ActivatedRoute } from '@angular/router';

import { Plugins, CameraResultType } from '@capacitor/core';

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
      .then(() => {
        this.guestName = '';
        this.guestPicture = null;
      });
  }

  async takePicture(): Promise<void> {
    const { Camera } = Plugins;
    try {
      const profilePicture = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        saveToGallery: true,
      });
      console.log(profilePicture);
      this.guestPicture = profilePicture.base64Data;
    } catch (error) {
      console.error(error);
    }
  }
}
