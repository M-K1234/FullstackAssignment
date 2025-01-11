import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DeezerService } from '../../services/deezer.service';

@Component({
  selector: 'app-deezer',
  standalone: true,
  imports: [NgFor],
  templateUrl: './deezer.component.html',
  styleUrl: './deezer.component.css'
})
export class DeezerComponent {

  albums: any;

  constructor(private deezer: DeezerService) 
  {
    
    deezer.getAlbums().subscribe(res => {
      this.albums = res.data;
    })
  }

  
}
