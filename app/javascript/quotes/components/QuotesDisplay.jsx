//Importando as dependencias
import React from 'react';  
import { Link } from 'react-router-dom';  
import queryString from 'query-string';  
import axios from 'axios';

//Criando a classe QuotesDisplay

class QuotesDisplay extends React.component{
	
	constructor(){
		super();
		this.state = {
			quotes: {}
		};
	}

	fetchQuote(id){
		axios.get(`api/quotes/${id}`)
		.then(response =>{
			this.setState({ quote: response.data });
		})
		.catch(error =>{
			console.error(error);
		});
	}

	setQuoteIdFromQueryString(qs){
		this.qsParams = queryString.parse(qs);

		if (this.qsParams.quote) {

			this.quoteId = Number(this.qsParams.quote);
		}else{
			this.quoteId = 1;

			// update URL in browser to reflect current quote in query string
			this.props.history.push(`/?quotes/${this.quoteId}`);
		}
	}

	componentDidMount(){
		this.setQuoteIdFromQueryString(this.props.location.search);
		this.fetchQuote(this.quoteId);
	}

	componentWillReceiveProps (nextProps) {
	    this.setQuoteIdFromQueryString(nextProps.location.search);
	    this.fetchQuote(this.quoteId);
	}

	render() {
		const nextQuoteId = Number(this.state.quote.id) + 1;

	  	return (
	  		<div>
	  			<Link to={`/?quote=${nextQuoteId}`}>Next</Link>
	  			<p>{ this.state.quote.text }</p>
	  			<p>{ this.state.quote.author }</p>
	  		</div>
	  	);
	}
	
}



export default QuotesDisplay;