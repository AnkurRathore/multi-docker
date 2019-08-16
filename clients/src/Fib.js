import React, {Component} from 'react';
import axios from 'axios';

class Fib extends Component {
    state ={
        seenIndexes: [],
        values: {},
        index: ''

    };

    componentDidMount(){
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues(){
        const values = await axios.get('/api/values/current')
        // console.log(values)
        
        this.setState({values:values.data})

    }
    async fetchIndexes(){
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({
            seenIndexes:seenIndexes.data
        });
    }
    handleSubmit = async(event) => {
        // console.log(this.state)
        event.preventDefault();

        await axios.post('/api/values',{
            index: this.state.index
        });
        this.setState({index:''})
    } 
    renderSeenIndexes(){
        // console.log(this.state.seenIndexes)
        return this.state.seenIndexes.map(({ number}) => number).join(', ')
    }

    renderValues(){
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For Index {key} I Calculated {this.state.values[key]}
                </div>
            )
        }
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter your Index:
                    </label>
                    <input
                        value={this.state.index}
                        onChange={event => this.setState({index:event.target.value})}
                    />
                    <button>Submit</button>
                </form>
                <h3>Indexes I have Seen</h3>
                {this.renderSeenIndexes()}
                <h3>Calculated Values:</h3>
                {this.renderValues()}
            </div>
        )
    }
}

export default Fib;