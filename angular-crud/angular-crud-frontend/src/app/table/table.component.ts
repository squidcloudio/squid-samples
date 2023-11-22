import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  template: `
    <table>
      <div id="theader">
        <thead>
          Crew Members
        </thead>
        <insert-user />
      </div>
      <read-users />
    </table>
  `,
})
export class TableComponent {}
