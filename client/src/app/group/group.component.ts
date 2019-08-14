import { Component, OnInit } from '@angular/core';
import {GroupService} from './group.service';
import {Group} from './group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [GroupService]
})
export class GroupComponent implements OnInit {
  groups: Group [];
  group: Group;
  groupName : string;
  user: string;
  numbers: number[];
  constructor(private groupService: GroupService ) { }

  ngOnInit() {
      this.groups = this.groupService.getGroups();
  }

}
