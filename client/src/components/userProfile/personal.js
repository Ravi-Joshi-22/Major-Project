
import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import EditIcon from 'material-ui/svg-icons/image/edit';
import borderLeft from 'material-ui/svg-icons/editor/border-left';
import { IconButton } from 'material-ui';
import formatAlignLeft from 'material-ui/svg-icons/editor/format-align-left'; 
class Personal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <Card style={{ margin: 10,marginTop:20 }}>

                   
                    <CardActions >
                        < IconButton  className="icon" tooltip='Edit'>
                            <EditIcon />
                        </IconButton>
                        
                    </CardActions>
                    <br/>
                    <div className="center">
                        <CardTitle title="Shreya Jhunjhunwala" subtitle="shreyajhunjhunwala7@gmail.com" />

                        <CardText>
                            Student At Medicaps Instiute Of Technology And Management<br />
                            Indore, Madhya Pradesh <br />

                        </CardText>
                    </div>
                    
                    
                    
                </Card>

            
             <style jsx global>{`
             .circular {
    
                border-radius: 50%;
             }
             .center {
                
                text-align: center;
             }
             .icon{
                float:right;
             }
             
            `}</style>

            </MuiThemeProvider>
        );
    }
}
export default Personal;