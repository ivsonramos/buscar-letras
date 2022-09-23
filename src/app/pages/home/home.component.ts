import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  titleMusic = "";
  artist: string = '';
  music: string = '';
  lyricMusic: string = '';
  translateMusic: string = '';
  artistMusic: string = '';
  artistphoto: string = '';
  img: string = '';
  link: string = '';
  musicplayer: string = '';


  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }

  findLyrics(){
    this.homeService.getMusic(this.artist, this.music).subscribe(
      (result: any)=>{
        if (result.type == 'notfound' || result.type == 'song_notfound') {
          alert('Não foi possivel encontrar nenhum resultado')
          this.titleMusic = 'Não foi possivel encontrar nenhum resultado'
        } else {
          console.log('Sucesso', result)
          this.translateMusic = "";
          this.lyricMusic = result.mus[0].text;
          this.artistMusic = result.art.name;
          this.titleMusic = result.mus[0].name;
          this.artistphoto = result.art.id;
          this.bringImage();
          this.link = "https://www.cifraclub.com.br/" + result.mus[0].url.split('br')[1].split('.')[0];
          this.musicplayer = "https://www.ouvirmusica.com.br/" + result.mus[0].url.split('br')[1].split('.')[0];

        }
        if(result.mus[0].translate){
          this.translateMusic = result.mus[0].translate[0].text;
        }

      },
      (error:any)=>{
        alert('Não foi possivel encontrar nenhum resultado')
      },
    )

  }

  bringImage(){
    let artist = this.artistphoto;

    this.homeService.getImg(artist).subscribe(
          (img: any) => {
            this.img= img.images[0].url;
          }
    );
  }
}
