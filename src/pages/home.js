import React, { Component } from 'react';
import { Route } from "react-router-dom";
import styled from "styled-components";
import { StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import { Root, getHeader, getDrawerSidebar, getSidebarTrigger, getSidebarContent, getCollapseBtn, getContent } from "@mui-treasury/layout";
import { getFixedScheme } from "@mui-treasury/layout/presets";
import NavContentEx from "../components/NavContentEx";
import HeaderEx from "../components/HeaderEx";
import Title from "../pages/title";
import AddTitle from "../pages/addtitle";
import UpdateTitle from "../pages/updatetitle";
import Sliding from "../pages/sliding";
import AddSliding from "../pages/addsliding";
import UpdateSliding from "../pages/updatesliding";
import AddAdminUser from "../pages/addadminuser";
import AdminUser from "../pages/adminuser";
import SmallLayout from "../pages/smalllayout";
import AddSmallLayout from "../pages/addsmalllayout";
import UpdateSmallLayout from "../pages/updatesmalllayout";
import Gift from "../pages/gift";
import AddGift from "../pages/addgift";
import UpdateGift from "../pages/updategift";
import Quiz from "../pages/quiz";
import AddQuiz from "../pages/addquiz";
import UpdateQuiz from "../pages/updatequiz";
import Layout from "../pages/layout";
import Blog from "../pages/blog";
import AddBlog from "../pages/addblog";
import UpdateBlog from "../pages/updateblog";

const Header = getHeader(styled);
const DrawerSidebar = getDrawerSidebar(styled);
const SidebarTrigger = getSidebarTrigger(styled);
const SidebarContent = getSidebarContent(styled);
const CollapseBtn = getCollapseBtn(styled);
const Content = getContent(styled);
const presets = { createFixedLayout: getFixedScheme() };


class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preset: "createFixedLayout"
    };
  }
  render() {
    return (
      <StylesProvider>
        <CssBaseline />
        <Root scheme={presets[this.state.preset]}>
          {({ state: { sidebar } }) => (
            <>
              <Header style={{ position: "sticky" }}
              >
                <Toolbar >
                  <SidebarTrigger sidebarId="primarySidebar" />
                  <HeaderEx {...this.props} />
                </Toolbar>
              </Header>
              <DrawerSidebar sidebarId="primarySidebar" >
                <SidebarContent style={{ backgroundImage: 'linear-gradient(315deg, #485461 0%, #28313b 74%)' }} >
                  <NavContentEx  {...this.props} />
                </SidebarContent>
                <CollapseBtn style={{ backgroundImage: 'linear-gradient(315deg, #485461 0%, #28313b 74%)', border: 0 }} />
              </DrawerSidebar>
              <Content >
                <Route path={this.props.match.url} exact render={(props) => <h1>Hello World</h1>} />
                <Route path={this.props.match.url + "/title"} render={(props) => <Title/>} />
                <Route path={this.props.match.url + "/addtitle"} render={(props) => <AddTitle {...props}/>} />
                <Route path={this.props.match.url + "/updatetitle"} render={(props) => <UpdateTitle {...props}/>} />
                <Route path={this.props.match.url + "/sliding"} render={(props) => <Sliding/>} />
                <Route path={this.props.match.url + "/addsliding"} render={(props) => <AddSliding {...props}/>} />
                <Route path={this.props.match.url + "/updatesliding"} render={(props) => <UpdateSliding {...props}/>} />
                <Route path={this.props.match.url + "/addadminuser"} render={(props) => <AddAdminUser/>} />
                <Route path={this.props.match.url + "/adminuser"} render={(props) => <AdminUser/>} />
                <Route path={this.props.match.url + "/smalllayout"} render={(props) => <SmallLayout {...props}/>} />
                <Route path={this.props.match.url + "/addsmalllayout"} render={(props) => <AddSmallLayout {...props}/>} />
                <Route path={this.props.match.url + "/updatesmalllayout"} render={(props) => <UpdateSmallLayout {...props}/>} />
                <Route path={this.props.match.url + "/gift"} render={(props) => <Gift {...props}/>} />
                <Route path={this.props.match.url + "/addgift"} render={(props) => <AddGift {...props}/>} />
                <Route path={this.props.match.url + "/updategift"} render={(props) => <UpdateGift {...props}/>} />
                <Route path={this.props.match.url + "/quiz"} render={(props) => <Quiz {...props}/>} />
                <Route path={this.props.match.url + "/addquiz"} render={(props) => <AddQuiz {...props}/>} />
                <Route path={this.props.match.url + "/updatequiz"} render={(props) => <UpdateQuiz {...props}/>} />
                <Route path={this.props.match.url + "/layout"} render={(props) => <Layout {...props}/>} />
                <Route path={this.props.match.url + "/blog"} render={(props) => <Blog {...props}/>} />
                <Route path={this.props.match.url + "/addblog"} render={(props) => <AddBlog {...props}/>} />
                <Route path={this.props.match.url + "/updateblog"} render={(props) => <UpdateBlog {...props}/>} />
              </Content>
            </>
          )}
        </Root>
      </StylesProvider>
    );
  }
}

export default home;
