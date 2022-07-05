import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button  } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {  FormControl , Select, MenuItem, InputLabel  } from '@material-ui/core';
import "../css/main.css";

const styles = theme => ({
    demo: {
      height: 'auto',
    },
    divider: {
      display: 'block',
      margin: `${theme.spacing(3)}px 0`,
    },
    input: {
      margin: theme.spacing(3),
      display: 'none',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(3),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
  });
  
class updatequiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:'', 
            question:'',
            opt1:'',
            opt2:'',
            opt3:'',
            opt4:'',
            ans:'',
            open:false,
            error:false,
            se : false,
            vertical: 'top',
            horizontal: 'center',
            message:''
         };
    }

    componentDidMount = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const page_type = urlParams.get('id')
        this.setState({
            productid:page_type
        });
    
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({loaderopen:true});
        }
    
        fetch(process.env.REACT_APP_URL_NODE+'getQuizById',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            id:page_type
            })
        })
        .then(res => {
        if (res.status !== 200) {
            throw new Error('Failed to fetch posts.');
        }
        return res.json();
        })
        .then(resData => {        
        this.setState({
        id:resData.data[0].id,
        question:resData.data[0].question,
        opt1:resData.data[0].opt1,
        opt2:resData.data[0].opt2,
        opt3:resData.data[0].opt3,
        opt4:resData.data[0].opt4,
        ans:resData.data[0].ans,
        userId:resData.data[0].userId
        });
    
        })
        .catch(err => {
        console.log(err);
        this.setState({
            loaderopen:false,
        });
        })
    
        }
    
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
      }
      submitHandler = e => {
        this.setState({open:true});
             e.preventDefault();
        fetch(process.env.REACT_APP_URL_NODE+'updateQuestion'
        ,{
            method: 'POST',
            body: JSON.stringify({
              id:this.state.id,
              userId:this.state.userId,
              question : this.state.question,
              opt1: this.state.opt1,
              opt2:this.state.opt2,
              opt3: this.state.opt3,
              opt4: this.state.opt4,
              ans: this.state.ans
                     }),
            headers: {
              'Content-Type': 'application/json'
            },
        }
        )
        .then(res => {
          // console.log("Hello World",res);
            if (res.status === 500) {
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
          if (resData.code === '0' || resData.code === '01' ) {
            // console.log(resData);
            this.setState({
              error : true,
              open:false,
              message: resData.success
            });
          }
          else{
            // console.log(resData);
            this.setState({
                userId:'',
                question :'',
                opt1: '',
                opt2:'',
                opt3: '',
                opt4: '',
                ans: '',
              open:false
            });
          }
          this.props.history.push("/home/quiz");
        })
        .catch(err => {
            // console.log(err);
            err.text().then( errorMessage => {
              // console.log(errorMessage);
              const errorMessage1 =JSON.parse(errorMessage);
              // console.log(errorMessage1.errorMessage);
              this.setState({
                error : true,
                open:false,
                message: errorMessage1.errorMessage
              });
            })
            // console.log(err);
        });
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
               <Container fixed>
               <br />
               <h1>Update Quiz</h1>
               <form onSubmit={this.submitHandler}>
            <Grid container spacing={3}>
            <Grid item
            xs={12}
            className={classes.demo}>
           <TextField 
           id="outlined-basic" 
           style = {{width: '100%'}} 
           label="Question" 
           variant="outlined"
           name="question" 
           value={this.state.question}
           onChange={this.handleChange}
           required
           />
                </Grid>
                <Grid item
            xs={6}
            className={classes.demo}>
           <TextField 
           id="outlined-basic" 
           style = {{width: '100%'}} 
           label="Option 1" 
           variant="outlined"
           name="opt1" 
           value={this.state.opt1}
           onChange={this.handleChange}
           required
           />
                </Grid>
                <Grid item
            xs={6}
            className={classes.demo}>
           <TextField 
           id="outlined-basic" 
           style = {{width: '100%'}} 
           label="Option 2" 
           variant="outlined"
           name="opt2" 
           value={this.state.opt2}
           onChange={this.handleChange}
           required
           />
                </Grid>
                <Grid item
            xs={6}
            className={classes.demo}>
           <TextField 
           id="outlined-basic" 
           style = {{width: '100%'}} 
           label="Option 3" 
           variant="outlined"
           name="opt3" 
           value={this.state.opt3}
           onChange={this.handleChange}
           required
           />
                </Grid>
                <Grid item
            xs={6}
            className={classes.demo}>
           <TextField 
           id="outlined-basic" 
           style = {{width: '100%'}} 
           label="Option 4" 
           variant="outlined"
           name="opt4" 
           value={this.state.opt4}
           onChange={this.handleChange}
           required
           />
                </Grid>
                <Grid item
            xs={6}
            className={classes.demo}>
         <FormControl variant="outlined" style = {{width: '100%'}} required>
        <InputLabel id="demo-simple-select-outlined-label">Answer</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          name="ans"
          value={this.state.ans}
          onChange={this.handleChange}
          label="Answer"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'opt1'}>Option 1</MenuItem>
          <MenuItem value={'opt2'}>Option 2</MenuItem>
          <MenuItem value={'opt3'}>Option 3</MenuItem>
          <MenuItem value={'opt4'}>Option 4</MenuItem>
        </Select>
      </FormControl>
                </Grid> 
                </Grid>
                <br />
              <Button type="submit" variant="contained" color="primary" style={{float:'right'}}>
        Update
      </Button>

                </form>
               </Container>
               <Backdrop className={classes.backdrop} open={this.state.open} >
        <CircularProgress color="inherit" />
      </Backdrop>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(updatequiz);
