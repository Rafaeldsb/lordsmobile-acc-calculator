import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AccGroup, AccType, group } from 'src/app/@core/utils/acc';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public accGroups: AccGroup[] = group;

  public form: FormGroup = new FormGroup({});

  constructor(private breakpointObserver: BreakpointObserver) { }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.accGroups.map(accGroup => {
      accGroup.accs.map(acc => this.form.addControl(acc.id, new FormControl('', [])));
    });
  }

  private getTimeFromGroup(type: AccType): number {
    return this.accGroups.find(x => x.type === type).accs.reduce((cur, acc) => cur + this.form.get(acc.id).value * acc.time, 0);
  }

  private splitTime(time): { d: number, h: number, m: number } {
    const d = Math.floor(time / (60 * 24));
    const remainder = time % (60 * 24);
    const h = Math.floor(remainder / 60);
    const m = Math.floor((time % (60 * 24)) % 60);
    return { d, h, m };
  }

  public formatTime(type: AccType): string {
    const time = this.splitTime(this.getTimeFromGroup(type));

    return `${time.d} d, ${time.h} h, ${time.m} min`;
  }
}
