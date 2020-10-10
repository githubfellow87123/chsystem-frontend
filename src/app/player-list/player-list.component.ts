import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PlayerListItem, PlayerListService, PlayerModel} from '../player-list.service';
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
  dataSource = new MatTableDataSource<PlayerListItem>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public playerListService: PlayerListService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.playerListService.getPlayers()
      .subscribe(data => this.dataSource.data = data);
  }

  addPlayer(): void {
    const playerModel: PlayerModel = {
      name: 'Ernst'
    };

    this.playerListService.addPlayer(playerModel)
      .subscribe(player => {
        const data = Array.from(this.dataSource.data);
        data.push(player);
        this.dataSource.data = data;
      });
  }

  deletePlayer(id: string): void {
    this.playerListService.deletePlayer(id)
      .subscribe(() => {
        const data = Array.from(this.dataSource.data);
        const index = data.findIndex(player => player.id === id);
        data.splice(index, 1);
        this.dataSource.data = data;
      });
  }
}
