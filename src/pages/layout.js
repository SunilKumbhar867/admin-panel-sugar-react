import React, { Component } from 'react';
import { Grid, TextField, Button  } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


// fake data generator
const getItems = count =>[{
    id:'1',
    content:<h5>Title</h5>,
    value:'titlebanner'
    },{
    id:'2',
    content:<h5>Sliding</h5>,
    value:'slidingbanner'
    },{
    id:'3',
    content:<h5>Small Layout</h5>,
    value:'smalllayout'
    },{
    id:'4',
    content:<h5>Gift</h5>,
    value:'gift'
    },{
    id:'5',
    content:<h5>Fireworks</h5>,
    value:'fireworks'
    },{
    id:'6',
    content:<h5>Quiz</h5>,
    value:'quiz'
    },{
    id:'7',
    content:<h5>Blog</h5>,
    value:'blog'
    },{
    id:'8',
    content:<h5>Contact</h5>,
    value:'contact'
    }]

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 20;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: '100%'
});

class layout extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            items: getItems(100),
            open:false,
            error:false,
            se : false,
            vertical: 'top',
            horizontal: 'center',
            message:''
         }
         this.onDragEnd = this.onDragEnd.bind(this);
    }
    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
        console.log("Before",this.state);
        const items = reorder(
          this.state.items,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
          items
        });
        console.log("After",this.state);
      }
      submitHandler = e => {
        this.setState({open:true});
             e.preventDefault();
        fetch(process.env.REACT_APP_URL_NODE+'sequence'
        ,{
            method: 'POST',
            body: JSON.stringify({
               sequence:this.state.items,
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
            console.log(resData);
            this.setState({
              error : true,
              open:false,
              message: resData.success
            });
          }
          else{
            console.log(resData);
            this.setState({
              open:false
            });
          }
            
        })
        .catch(err => {
            // console.log(err);
            // err.text().then( errorMessage => {
            //   const errorMessage1 =JSON.parse(errorMessage);
            //   this.setState({
            //     error : true,
            //     open:false,
            //     message: errorMessage1.errorMessage
            //   });
            // })
        });
      }
    render() {
  return  (
      <>
    <DragDropContext onDragEnd={this.onDragEnd}>
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {this.state.items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
  <form onSubmit={this.submitHandler}>
  <Button type="submit" variant="contained" color="primary" style={{float:'right'}}>
        Add
      </Button>
  </form>
  </>
  )
    }
}
 
export default layout;