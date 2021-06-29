var app = {
  init: function() {
    console.log('init');

    // TODO
    app.drawBoard();

    // Event listeners - TODO
    document.querySelector( "#launchScript" ).addEventListener( "click", app.handleLaunchScriptButton )
  },
  drawBoard: function() {
    let boardElement = document.querySelector( "#board" );
    for( let row = 0; row < 4; row++ ) 
    {
      let divRowElement = document.createElement( "div" );
      divRowElement.classList.add( "cellRow" );
      divRowElement.setAttribute('id','row' + ( row + 1 ) );
      boardElement.appendChild( divRowElement );
      for( let column = 0; column < 6; column++ )
      {
        if( row === 0 && column === 0 )
        {
          let divStartElement = document.createElement( "div" );
          divStartElement.classList.add( "cell", "cellStart", "cellCurrent" );
          divStartElement.setAttribute('id','column' + ( column + 1 ) );
          divRowElement.appendChild( divStartElement );
        }
        else if( row === 3 && column === 5 )
        {
          let divEndElement = document.createElement( "div" );
          divEndElement.classList.add( "cell", "cellEnd" );
          divEndElement.setAttribute('id','column' + ( column + 1 ) );
          divRowElement.appendChild( divEndElement );
        }
        else
        {
          let divColumnElement = document.createElement( "div" );
          divColumnElement.classList.add( "cell" );
          divColumnElement.setAttribute('id','column' + ( column + 1 ) );
          divRowElement.appendChild( divColumnElement );
        }
      }
    }
  },
  moveForward: function() {
    cellCurrentElement = document.querySelector( ".cellCurrent" );
    cellCurrentId = cellCurrentElement.getAttribute( "id" );
    console.log(cellCurrentId);
    rowCellCurrentElement = cellCurrentElement.closest( ".cellRow" );
    console.log( rowCellCurrentElement );

    if( cellCurrentElement.classList.contains( "cellCurrent-top" ) )
    {
      nextCellRowElement = rowCellCurrentElement.closest( ".cellRow" );
      cellCurrentElement.classList.remove( "cellCurrent", "cellCurrent-top" );
      nextCellElement = nextCellRowElement.querySelector( "#" + cellCurrentId );
      if (nextCellElement == null)
      {
        alert( "You loose because you overflowed !");
      }
      else
      {
        nextCellElement.classList.add( "cellCurrent", "cellCurrent-top" );
      }
    }
    else if ( cellCurrentElement.classList.contains( "cellCurrent-bottom" ) )
    {
      nextCellRowElement = rowCellCurrentElement.nextSibling;
      cellCurrentElement.classList.remove( "cellCurrent", "cellCurrent-bottom" );
      
      if (nextCellRowElement == null)
      {
        alert( "You loose because you overflowed !");
      }
      else
      {
        nextCellElement = nextCellRowElement.querySelector( "#" + cellCurrentId );
        nextCellElement.classList.add( "cellCurrent", "cellCurrent-bottom" );
      }
      
    }
    else if ( cellCurrentElement.classList.contains( "cellCurrent-left" ) )
    {
      cellCurrentElement.classList.remove( "cellCurrent" );
      nextCellElement = cellCurrentElement.closest( ".cell" );
      if (nextCellElement == null)
      {
        alert( "You loose because you overflowed !");
      }
      else
      {
        nextCellElement.classList.add( "cellCurrent", "cellCurrent-left" );
      }
      
    }
    else if ( cellCurrentElement.classList.contains( "cellCurrent-right" ) )
    {
      cellCurrentElement.classList.remove( "cellCurrent" );
      nextCellElement = cellCurrentElement.nextSibling;
      if (nextCellElement == null)
      {
        alert( "You loose because you overflowed !");
      }
      else
      {
        nextCellElement.classList.add( "cellCurrent", "cellCurrent-right" );
      }
      
    }
    else
    {
      cellCurrentElement.classList.remove( "cellCurrent" );
      nextCellElement = cellCurrentElement.nextSibling;
      if (nextCellElement == null)
      {
        alert( "You loose because you overflowed !");
      }
      else
      {
        nextCellElement.classList.add( "cellCurrent" );
      }
      
    }
  },
  turnRight: function() {
    cellCurrentElement = document.querySelector( ".cellCurrent" );
    if( cellCurrentElement.classList.contains( "cellCurrent-top" ) )
    {
      cellCurrentElement.classList.remove( "cellCurrent-top" );
      cellCurrentElement.classList.add( "cellCurrent-right" );
    }
    else if ( cellCurrentElement.classList.contains( "cellCurrent-bottom" ) )
    {
      cellCurrentElement.classList.remove( "cellCurrent-bottom" );
      cellCurrentElement.classList.add( "cellCurrent-left" );
    }
    else if ( cellCurrentElement.classList.contains( "cellCurrent-left" ) )
    {
      cellCurrentElement.classList.remove( "cellCurrent-left" );
      cellCurrentElement.classList.add( "cellCurrent-top" );
    }
    else if ( cellCurrentElement.classList.contains( "cellCurrent-right" ) )
    {
      cellCurrentElement.classList.remove( "cellCurrent-right" );
      cellCurrentElement.classList.add( "cellCurrent-bottom" );
    }
    else
    {
      cellCurrentElement.classList.add( "cellCurrent-bottom" );
    }
  },
  turnLeft: function() {
    cellCurrentElement = document.querySelector( ".cellCurrent" );
    if( cellCurrentElement.classList.contains( "cellCurrent-top" ) )
    {
      cellCurrentElement.classList.remove( "cellCurrent-top" );
      cellCurrentElement.classList.add( "cellCurrent-left" );
    }
    else if ( cellCurrentElement.classList.contains( "cellCurrent-bottom" ) )
    {
      cellCurrentElement.classList.remove( "cellCurrent-bottom" );
      cellCurrentElement.classList.add( "cellCurrent-right" );
    }
    else if ( cellCurrentElement.classList.contains( "cellCurrent-left" ) )
    {
      cellCurrentElement.classList.remove( "cellCurrent-left" );
      cellCurrentElement.classList.add( "cellCurrent-bottom" );
    }
    else if ( cellCurrentElement.classList.contains( "cellCurrent-right" ) )
    {
      cellCurrentElement.classList.remove( "cellCurrent-right" );
      cellCurrentElement.classList.add( "cellCurrent-top" );
    }
    else
    {
      cellCurrentElement.classList.add( "cellCurrent-top" );
    }
  },
  handleLaunchScriptButton: function() {
    // TODO
    textareaValue = document.querySelector( "#userCode" ).value;
    
    // TODO : get all lines as an array
    let codeLines = textareaValue.split(' ');

    window.setTimeout(function() {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },
  codeLineLoop: function(codeLines, index) {
    // Getting currentLine
    var currentLine = codeLines[index];
    console.log(currentLine);

    if( currentLine == "right" )
    {
      app.turnRight();
    }
    else if ( currentLine == "left" )
    {
      app.turnLeft();
    }
    else if ( currentLine == "move" )
    {
      app.moveForward();
    }
    else 
    {
      alert( "Commande inconnu !" );
      return false;
    }
    // Increment
    index++;

    // if still a line to interpret
    if (index < codeLines.length) {
      // Recall same method (=> make a loop)
      window.setTimeout(function() {
        app.codeLineLoop(codeLines, index);
      }, 1000);
    } else {
      window.setTimeout(function() {
        app.checkSuccess();
      }, 1000);
    }
  },
  checkSuccess: function() {
    // TODO display if the game is won or not
    cellCurrentElement = document.querySelector( ".cellCurrent" );

    if( cellCurrentElement.classList.contains( "cellEnd" ) )
    {
      alert( "You win !" );
    }
    else
    {
      alert( "You loose !" )
    }
  }
};

document.addEventListener('DOMContentLoaded', app.init);
