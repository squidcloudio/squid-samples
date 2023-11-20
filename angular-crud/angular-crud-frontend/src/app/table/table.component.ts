import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  template: `
    <table>
      <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center">
        <thead>
          Crew to Enlist
        </thead>
        <insert-user />
      </div>
      <read-users />
    </table>
  `,
})
export class TableComponent {}
