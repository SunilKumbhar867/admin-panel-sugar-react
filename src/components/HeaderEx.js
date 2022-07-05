import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import Toolbar from '@material-ui/core/Toolbar';
const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    fontWeight: 900,
    minWidth: 0,
    fontSize: 18,
  },
  grow: {
    flexGrow: 1
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    // backgroundColor: deepOrange[500],
    backgroundImage: 'linear-gradient(to right , #a517ba, #5f1782)',
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class HeaderEx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    //console.log(this.props);  
  }

  handleClick = event => this.setState({ anchorEl: event.currentTarget })
  handleClose = () => this.setState({ anchorEl: null })


  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      < div className={classes.root} >
        <Toolbar >
          <Typography variant="h6" className={classes.title}>
          SUGAR Cosmetics
          </Typography>
          <Avatar alt="Remy Sharp" src="/broken-image.jpg" onClick={this.handleClick} className={classes.orange}  >
            R
          </Avatar>
        </Toolbar>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.props.logoutHandler}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(useStyles)(HeaderEx);
