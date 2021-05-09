import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { post } from 'jquery';
import { Post } from '../../interfaces/post';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();

  constructor(
    private post: PostService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.post.getPosts().subscribe(posts => {
      this.posts = posts;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
