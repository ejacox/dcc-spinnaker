class SubmissionsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submissions: []
    };
  }

  componentDidMount() {
		fetch("http://rob.medbook.io:5000/v0/submissions")
    .then(response => response.json())
    .then(json => {
      this.setState(json);
    });  
  }

	handleClick(submission) {
    // If there is a receipt download it for the user
    if (submission.receipt) {
      let receipt = "data:text/tab-separated-values," 
        + encodeURIComponent(submission.receipt);
      window.open(receipt);
    }
  }

  render() {
    return (
      <cgl-data-table-container>
				<cgl-data-table>
					<cgl-data-table-row>
						<cgl-data-table-cell>Created</cgl-data-table-cell>
						<cgl-data-table-cell>ID</cgl-data-table-cell>
						<cgl-data-table-cell>Status</cgl-data-table-cell>
					</cgl-data-table-row>
					{this.state.submissions.map(submission =>
					<cgl-data-table-row key={submission.id} onClick={e => this.handleClick(submission)}>
						<cgl-data-table-cell>{submission.created}</cgl-data-table-cell>
						<cgl-data-table-cell>{submission.id}</cgl-data-table-cell>
						<cgl-data-table-cell>
              {submission.status}
              {submission.validation_message ? ": " + submission.validation_message : ""}
            </cgl-data-table-cell>
					</cgl-data-table-row>
					)}
				</cgl-data-table>
      </cgl-data-table-container>
    );
  }
}

ReactDOM.render(<SubmissionsList/>, document.getElementById("submissions-list"));