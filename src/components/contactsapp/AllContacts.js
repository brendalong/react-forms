import React, { Component } from 'react';
import { Card, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
// import { Route } from 'react-router-dom';
// import GetContact from './GetContact';


export default class AllContacts extends Component{
    state = {
        contacts:[]
    }

    componentDidMount(){
        const storedUser = sessionStorage.getItem("user");
        
        if(storedUser){
            const storedUserObj = JSON.parse(storedUser);
            this.loadContacts(storedUserObj.id)
        }else{
            this.loadContacts(this.props.user.id)
        }
        
    }

    loadContacts = (id) => {
        fetch(`http://localhost:4000/contacts?ownerID=${id}`)
        .then((data)=>{
            return data.json();
        }).then((userContacts)=>{
            this.setState({
                contacts: userContacts
            })
            console.log(userContacts)
        })
    }

    render(){
        return(
            <div>
            <h2>All Contacts</h2>
                    <ContactsList contacts={this.state.contacts}/>
            </div>
        )
    }
}

class ContactsList extends Component{
    render(){
        const contacts = this.props.contacts.map((contact)=>(
            <CardExampleHeaderCard
                key={contact.id}
                id={contact.id}
                name={contact.name}
                company={contact.company}
                notes={contact.notes}
                image={contact.image}
                rating={contact.rating}
            />
        ));
        return(
            <div>
                <Card.Group>
                    {contacts}
                </Card.Group>
            </div>
        )
    }

}

class CardExampleHeaderCard extends Component{
    render(){
        return(
            <Card>
                <Card.Content>
                    <Image floated='right' size='mini' src={this.props.image} />
                    <Card.Header>
                    <Link to={`/contactsapp/${this.props.id}`}>{this.props.name}</Link>
                    </Card.Header>
                    <Card.Meta>
                    {this.props.company}
                    </Card.Meta>
                    <Card.Description>
                    <strong>{this.props.notes}</strong>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui four buttons'>
                    <Button basic color='green' icon="call"></Button>
                    <Button basic color='green' icon="talk"></Button>
                    <Button basic color='green' icon="mail"></Button>
                    <Button basic color='blue'>Edit</Button>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}