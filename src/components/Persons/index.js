import React from 'react';
import client from '../../Client';

import {
  DetailsList,
  // DetailsListLayoutMode,
  Selection,
} from 'office-ui-fabric-react/lib/DetailsList';

import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

//locale
import localization from '../../locale/common';



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
        const hello = res.data;
        this.setState({ hello });
      });

      this.getPeopleList();
      this.setLanguage();
  }

  getPeopleList = () => {
    client.get('/personlist')
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
      this.setState({ filtered_items: persons});
    });
  }

  setLanguage = () => {
    localization.setLanguage(new URLSearchParams(this.props.location.search).get('lang') || 'en');
    this.setState({});
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
    let _columns = [
      {
        key: 'column7',
        name: localization.contract,
        fieldName: 'contract',
        minWidth: 70,
        maxWidth: 150,
      },
      {
        key: 'column6',
        name: localization.role,
        fieldName: 'role',
        minWidth: 70,
        maxWidth: 150,
      },
      {
        key: 'firstName',
        name: localization.firstName,
        fieldName: 'firstName',
        minWidth: 100,
        maxWidth: 150,
      },
      {
        key: 'column2',
        name: localization.lastName,
        fieldName: 'lastName',
        minWidth: 100,
        maxWidth: 150,
      },
      {
        key: 'column3',
        name: localization.address,
        fieldName: 'address',
        minWidth: 100,
        maxWidth: 150,
      },
      {
        key: 'column44',
        name: localization.city,
        fieldName: 'city',
        minWidth: 100,
        maxWidth: 150,
      },
      {
        key: 'column5',
        name: localization.experience,
        fieldName: 'experience',
        minWidth: 50,
        maxWidth: 150,
      },
    ];
    let  _selection = new Selection({
      onSelectionChanged: () => {
        if (_selection.getSelection()[0]) {
          const personId = _selection.getSelection()[0].id;
          this.props.history.push(`person/${personId}?lang=${localization.getLanguage()}`)
        }
      }
    });
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
          labelText={localization.search}
          onSearch={ (keyword) => this.onSearch(keyword) }
          onBlur={ () => this.onBlurSearch.bind(this) }
          onEscape={()=>this.onBlurSearch.bind(this)}
        />
        <DetailsList
          items={ this.state.filtered_items }
          columns={ _columns }
          selection={ _selection }
          
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