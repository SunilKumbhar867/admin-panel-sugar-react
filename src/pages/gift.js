import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {  Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import UpdateIcon from '@material-ui/icons/Update';

const styles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});


class gift extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      page: 0,
      count: 100,
      data: [],
      open:false,
      columns: [
        {
          name: "title",
          label:"Title",
          options: {
            filter: false,
          }
        },
        {
            name: "img",
            label:"Img",
            options: {
              filter: true,
              customBodyRender: (value, tableMeta, updateValue) => {
    console.log(value);
                return (
                  <img src={'https://sugarcosmetic.s3.ap-south-1.amazonaws.com/'+value}  style={{"width":"30px", "height":"30px"}}  alt="MyImage" />
                );
              }
            }
          },
        {
          name: "role",
          label:"Role",
          options: {
            filter: true,
          }
        },
        {
          name: "status",
          label:"Status",
          options: {
            filter: true,
            customBodyRender: (value, tableMeta, updateValue) => {
// console.log(value);
console.log(tableMeta.rowData);
// console.log(updateValue);
                                  return (
                                    <FormControlLabel
                                    control={<Switch checked= {value} onChange={e => this.handleChange(e, tableMeta.rowData[4])}  name="status" />}
                                  />
                                  );
                                }
          }
        },
        {
          name: "id",
          label:"Update",
          options: {
            filter: true,
            customBodyRender: (value, tableMeta, updateValue) => {
console.log("/home/updategift?id="+value);
const url = "/home/updategift?id="+value;
                                  return (
                                    <Link to={url} >
                                       <Button variant="contained" color="secondary"><UpdateIcon /></Button>
                                    </Link>
                                  );
                                }
          }
        },
        {
          name: "id",
          label:"Action",
          options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => (
              <IconButton aria-label="delete" onClick={() => {this.handleChangeDelete(tableMeta.rowData[4], tableMeta.rowData[1]) }}>
              <DeleteIcon  />
              </IconButton>
           )
          }
        },
        ]
  
     };
  }


   handleChangeDelete = (e, imgkey) =>{
    console.log(imgkey);
        fetch(process.env.REACT_APP_URL_NODE+'deleteGift',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id:e,
            img:imgkey
          })
        })  
          .then(res => {
            // console.log(res);
            if (res.status === 500) {
              // throw new Error('Validation failed.');
              throw res ;
            }
            if (res.status !== 200 && res.status !== 201) {
              // console.log('Error!');
              // throw new Error('Could not authenticate you!');
              throw res ;
            }
            return res.json();
          })
          .then(resData => {
            this.getData()
          })
          .catch(err => {
            // console.log(err);
          //  err.text().then( errorMessage => {
          //  const errorMessage1 =JSON.parse(errorMessage);
          //  console.log(errorMessage1.errorMessage);
          //     this.setState({
          //       error : true,
          //       open:false,
          //       message: errorMessage1.errorMessage
          //     });
  //          })
          });
  }
  handleChange = (e, a) =>{
    const val = e.target.checked
    console.log(a);
    e.preventDefault();
        fetch(process.env.REACT_APP_URL_NODE+'updateGift',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: a,
            status: e.target.checked
          })
        })
    
          .then(res => {
            // console.log(res);
            if (res.status === 500) {
              // throw new Error('Validation failed.');
              throw res ;
            }
            if (res.status !== 200 && res.status !== 201) {
              // console.log('Error!');
              // throw new Error('Could not authenticate you!');
              throw res ;
            }
            return res.json();
          })
          .then(resData => {
            // console.log(resData);
      this.setState(
      prevState => ({
        data:prevState.data.map(
          el => el.id === a? { ...el, status: val }: el
        )
      }) );
            //console.log(resData.code);
            // if (resData.code == '0' || resData.code == '01' ) {
            //   console.log(resData);
            //   this.setState({
            //     error : true,
            //     open:false,
            //     message: resData.data.message
            //   });
            // }
            // else{
            //   this.setState({
            //     isAuth: true,
            //     token: resData.data.token,
            //     authLoading: false,
            //     userId: resData.userId
            //   });
            //   localStorage.setItem('token', resData.data.token);
            //   localStorage.setItem('userId', resData.data.success._id);
            //   const remainingMilliseconds = 60 * 60 * 1000;
            //   const expiryDate = new Date(
            //     new Date().getTime() + remainingMilliseconds
            //   );
            //   localStorage.setItem('expiryDate', expiryDate.toISOString());
            //   this.props.onLogin();
            //   this.props.history.push("/home")
            //   this.setAutoLogout(remainingMilliseconds);
            // }
          })
          .catch(err => {
            // console.log(err);
          //  err.text().then( errorMessage => {
          //  const errorMessage1 =JSON.parse(errorMessage);
          //  console.log(errorMessage1.errorMessage);
          //     this.setState({
          //       error : true,
          //       open:false,
          //       message: errorMessage1.errorMessage
          //     });
  //          })
          });
        }
  componentDidMount() {
    const page = 0;
        this.getData(page)
  }

  // get data
  getData = (page) => {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({open:true});
    }
    // console.log(page);
    fetch(process.env.REACT_APP_URL_NODE+'getGift',{
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        page:page
        })
  })
  .then(res => {
    if (res.status !== 200) {
      throw new Error('Failed to fetch posts.');
    }
    return res.json();
  })
  .then(resData => {
    
//   console.log(resData);
    this.setState({
      page: page,
      data: resData.data.map(post => {
             return {
              title:post.title,
              img:post.img,
              status:post.status,
              id:post.id,
              role:'admin'
             };
      }),
      open:false
    });
    // console.log(this.state.data);
    
  })
  .catch(err => {
      // console.log(err);
      this.setState({
        open:false
      });
      
  })

  };


  changePage = page => {
    this.getData(page);
  };

  render() {
    const { columns, data } = this.state;
    const { page, count } = this.state;
    const { classes } = this.props;

    const options = {
      filter: true,
      filterType: "dropdown",
      //yyresponsive: "stacked",
      serverSide: true,
      rowsPerPage: 10,
      count: count,
      page: page,
      onTableChange: (action, tableState) => {
        // console.log(action, tableState);
        // a developer could react to change on an action basis or
        // examine the state as a whole and do whatever they want

        switch (action) {
          case "changePage":
            this.changePage(tableState.page);
            break;
        }
      }
    };

    return (
      <React.Fragment>
      <Container fixed>
        <br />
      <Link to="/home/addgift"><Button style={{
  //borderRadius: 35,
  backgroundColor: "green",
  float:"right",
  //padding: "18px 36px",
  //fontSize: "18px"
}} variant="contained"><AddIcon /></Button></Link>
<br />
      <MUIDataTable
      title="Gift"
      data={data}
      columns={columns}
      options={options}
    />
    </Container>
    <Backdrop className={classes.backdrop} open={this.state.open} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
    );
  }
}

export default withStyles(styles)(gift);
