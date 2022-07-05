import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";
import PersonIcon from '@material-ui/icons/Person';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import TitleIcon from '@material-ui/icons/Title';
import WebIcon from '@material-ui/icons/Web';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            style={{ color: "#fff" }}
            primary={"Home"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>
      <Link to="/home/layout" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <WebIcon />
          </ListItemIcon>
          <ListItemText
            style={{ color: "#fff" }}
            primary={"Layout"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>
      <Link to="/home/title" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <TitleIcon />
          </ListItemIcon>
          <ListItemText
            style={{ color: "#fff" }}
            primary={"Title"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>
      <Link to="/home/sliding" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <SlideshowIcon />
          </ListItemIcon>
          <ListItemText
            style={{ color: "#fff" }}
            primary={"Sliding"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>
      <Link to="/home/smalllayout" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <SlideshowIcon />
          </ListItemIcon>
          <ListItemText
            style={{ color: "#fff" }}
            primary={"Small Layout"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>
      <Link to="/home/gift" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <CardGiftcardIcon />
          </ListItemIcon>
          <ListItemText
            style={{ color: "#fff" }}
            primary={"Gift"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>
      <Link to="/home/quiz" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <QuestionAnswerIcon />
          </ListItemIcon>
          <ListItemText
            style={{ color: "#fff" }}
            primary={"Quiz"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>
      <Link to="/home/blog" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <CardGiftcardIcon />
          </ListItemIcon>
          <ListItemText
            style={{ color: "#fff" }}
            primary={"Blog"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>
      <Link to="/home/adminuser" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText
            style={{ color: "#fff" }}
            primary={"Admin User"}
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
      </Link>
    </List>
  );
}
