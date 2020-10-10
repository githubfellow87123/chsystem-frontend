import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PlayerListService} from '../player-list.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'delete'];
  dataSource = new MatTableDataSource(this.playerListService.players);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public playerListService: PlayerListService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.playerListService.getPlayers()
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

  addPlayer(): void {
    this.playerListService.addPlayer();
    this.dataSource.data = this.playerListService.players;
  }

  deletePlayer(id: string): void {
    this.playerListService.deletePlayer(id);
    this.dataSource.data = this.playerListService.players;
  }
}
