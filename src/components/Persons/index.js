import React from 'react';
import client from '../../Client';

import {
  DetailsList,
  // DetailsListLayoutMode,
  // Selection,
} from 'office-ui-fabric-react/lib/DetailsList';

import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

let _columns = [
  {
    key: 'column7',
    name: 'Contract',
    fieldName: 'contract',
    minWidth: 70,
    maxWidth: 150,
  },
  {
    key: 'column6',
    name: 'Role',
    fieldName: 'role',
    minWidth: 70,
    maxWidth: 150,
  },
  {
    key: 'firstName',
    name: 'First Name',
    fieldName: 'firstName',
    minWidth: 100,
    maxWidth: 150,
  },
  {
    key: 'column2',
    name: 'Last Name',
    fieldName: 'lastName',
    minWidth: 100,
    maxWidth: 150,
  },
  {
    key: 'column3',
    name: 'Address',
    fieldName: 'address',
    minWidth: 100,
    maxWidth: 150,
  },
  {
    key: 'column44',
    name: 'City',
    fieldName: 'city',
    minWidth: 100,
    maxWidth: 150,
  },
  {
    key: 'column5',
    name: 'Exp (yrs)',
    fieldName: 'experience',
    minWidth: 50,
    maxWidth: 150,
  },
  // {
  //   key: 'column2',
  //   name: 'Value',
  //   fieldName: 'value',
  //   minWidth: 100,
  //   maxWidth: 200,
  //   isResizable: true,
  //   ariaLabel: 'Operations for value'
  // },
];


class PeopleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      hello: '',
      persons: [],
      filtered_items: [],
    };
  }

  componentDidMount() {
    // axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
    //   .then(res => {
    //     const posts = res.data.data.children.map(obj => obj.data);
    //     this.setState({ posts });
    //   });
      client.get(`/helloworld`)
      .then(res => {
       // console.log("res", res.data);
        const hello = res.data;
        this.setState({ hello });
      });
      client.get('/')
      .then(res => {
        console.log("table", res.data);
        const persons = res.data;
        this.setState({ persons });
        this.setState({ filtered_items: persons});
      });
      
  }

  onSearch = (keyword) => {
    if (keyword === '') {
      this.setState({ filtered_items: this.state.persons});
    }

    let filtered_items = this.state.persons.filter((person) => {
      const firstName = person.firstName.toLowerCase();
      const lastName = person.lastName.toLowerCase();
      const  k = keyword.toLowerCase();
      return (firstName.includes(k) || lastName.includes(k))
    })

    this.setState({ filtered_items});
  }

  onBlurSearch = () => {
    this.setState({ 
      filtered_items: this.state.persons
    });
  }

  render() {
    return (
      <div>
         <p>{this.state.hello}</p>
        {/* <h1>{`/r/${this.props.subreddit}`}</h1>
        <ul>
          {this.state.posts.map(post =>
            <li key={post.id}>{post.title}</li>
          )}
        </ul> */}
        
        <div>
          <SearchBox
          onSearch={ (keyword) => this.onSearch(keyword) }
          onBlur={ () => this.onBlurSearch.bind(this) }
          onEscape={()=>this.onBlurSearch.bind(this)}
        />
        <DetailsList
          items={ this.state.filtered_items }
          columns={ _columns }
          
          // setKey='set'
          // layoutMode={ DetailsListLayoutMode.fixedColumns }
          // selection={ this._selection }
          // selectionPreservedOnEmptyClick={ true }
          // ariaLabelForSelectionColumn='Toggle selection'
          // ariaLabelForSelectAllCheckbox='Toggle selection for all items'
          // onItemInvoked={ this._onItemInvoked }
        />
        </div>
      </div>
    );
  }
}

export default PeopleList;