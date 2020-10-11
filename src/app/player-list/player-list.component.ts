import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Player, PlayerService, PlayerModel} from '../player.service';
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
  dataSource = new MatTableDataSource<Player>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public playerService: PlayerService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.playerService.getPlayers()
      .subscribe(data => this.dataSource.data = data);
  }

  addPlayer(): void {
    const playerModel: PlayerModel = {
      name: 'Ernst'
    };

    this.playerService.addPlayer(playerModel)
      .subscribe(player => {
        this.dataSource.data.push(player);
        this.dataSource.data = [...this.dataSource.data];
      });
  }

  deletePlayer(id: string): void {
    this.playerService.deletePlayer(id)
      .subscribe(() => {
        const index = this.dataSource.data.findIndex(player => player.id === id);
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
      });
  }
}
