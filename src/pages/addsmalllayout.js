import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {  FormControl , Select, MenuItem, InputLabel  } from '@material-ui/core';

import {
    Paper,
    Grid,
    Typography,
    Button,
  } from '@material-ui/core';
  const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: 30
      },
      field: {
        width: '80%',
        marginBottom: 20
      },
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
      input: {
        display: 'none',
      },
  });
class addsmalllayout extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          title:'',
          image:null,
          content:'',
          role:'',
          token: '',
          userId: '',
          subCode:'MCA1002',
          open:false,
          error:false,
          vertical: 'top',
          horizontal: 'center',
          message:''
         };
        //  console.log(this.props);
    }
 
componentDidMount = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  this.setState({
    token: token,
    userId: userId
  });
}

    changeHandler = e => {
      this.setState({[e.target.name]: e.target.value});
    }

    submitHandler = e => {
      this.setState({open:true});
      e.preventDefault();
      const formData = new FormData();
      formData.append('image', this.state.image);
      formData.append('title', this.state.title);
      formData.append('content', this.state.content);
      formData.append('user_id', this.state.userId);
  //  console.log(this.state.content);
      fetch(process.env.REACT_APP_URL_NODE+'addSmalllayout',{
          method: 'POST',
          body: formData,
          headers: {
            Authorization: 'Bearer ' + this.props.token
          },
      })
      .then(res => {
          if (res.status === 422) {
              // throw new Error('Validation failed.');
              throw res ;
            }
          if (res.status !== 200 && res.status !== 201) {
            //Encode the error
            // throw new Error('Creating or editing a post failed!');
            throw res ;
          }
          return res.json();
        })
      .then(resData => {
          // console.log(resData);
          this.setState({
           title: '',
           content:'',
           role:'',
           open:false
          });
          this.props.history.push("/home/smalllayout");
      })
      .catch(err => {
          // console.log(err);
          err.text().then( errorMessage => {
            // console.log(errorMessage);
            const errorMessage1 =JSON.parse(errorMessage);
            this.setState({
              error : true,
              open:false,
              message: errorMessage1.error
            });
          })
          // console.log(err);
      });

    }


    handleChangeImage = selectedItem => {
      //console.log(selectedItem);
      this.setState(
        {
          image: selectedItem.target.files[0],
          loaded: 0,
        }
      );
    }
    handleClose = () => {
      this.setState({ error: false });
    };

    render() {
      const { vertical, horizontal, error } = this.state;
        const { classes } = this.props;
        return (
          <React.Fragment>
                <div>
                  <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={error}
        onClose={this.handleClose}
        key={vertical + horizontal}
      >
           <Alert severity="error">{ this.state.message}</Alert>
    </Snackbar>
      </div>
            <div className={classes.root}>
         <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
          <Grid item xs={12} md={6}>
            <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
            Add Smalllayout
            </Typography>
              <Typography component="p">
              Android Enterprise set up required. Android Enterprise is recommended for all Android device enrollments. Click here to set up Android Enterprise under Mobile Device Management 
              </Typography>  
              <div>  
              <form onSubmit={this.submitHandler}>
              <TextField
                 name="title"
                 id="standard-basic"
                 label="Title"
                 style = {{width: '100%'}} 
                 className={classes.field}
                 value={this.state.title}
                 onChange={this.changeHandler}
              />
              <TextField
                 name="content"
                 id="standard-basic"
                 label="Content"
                 style = {{width: '100%'}} 
                 className={classes.field}
                 value={this.state.content}
                 onChange={this.changeHandler}
                 multiline
              />
              <FormControl style = {{width: '100%'}} required>
        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
        <Select
          id="standard-basic"
          name="role"
          value={this.state.role}
          onChange={this.changeHandler}
          label="Role"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'home'}>Home</MenuItem>
          <MenuItem value={'all'}>All</MenuItem>
        </Select>
      </FormControl>
      <br/>
      <br/>
      <br/>
           <input
        name="image" 
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        onChange={this.handleChangeImage} 
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="default" component="span"   startIcon={<CloudUploadIcon />}  style = {{width: '100%'}} >
          Upload
        </Button>
      </label>
      <br />
      <br />
              <Button type="submit" variant="contained" color="primary">
        Add Small Layout
      </Button>
                  </form>
                  </div>
            </Paper>  
            </Grid>
            </Grid>  
          </div>
          <Backdrop className={classes.backdrop} open={this.state.open} >
        <CircularProgress color="inherit" />
      </Backdrop>
          </React.Fragment>
        );
    }
}

export default  withStyles(styles)(addsmalllayout);