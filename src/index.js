import React, {Component} from 'react'
import { SSTable } from "./table/SSTable";

export default class App extends Component {
  render() {
    let tableTitle = 'My money'
    let columns = [{
      title: 'Date',
      field: 'date'
    }, {
      title: 'Source',
      field: 'source'
    }, {
      title: 'Suspicious source of money?',
      field: 'isSuspicious'
    }]
    let data = [{
      date: '13/02/2000',
      source: 'Mom',
      isSuspicious: true
    }, {
      date: '02/01/2001',
      source: 'Work',
      isSuspicious: true
    }]
    let isSelectable = true;

    return <div>
      <SSTable config={{tableTitle, columns, data, isSelectable}}/>
    </div>
  }
}
