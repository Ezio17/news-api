import React from 'react'

class ModalEditNews extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      valueTextArea: '',
      valueInput: '',
    };

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
  }

  handleChangeInput(event) {
    this.setState({ valueInput: event.target.value });
  }

  handleChangeTextArea(event) {
    this.setState({ valueTextArea: event.target.value });
  }

  render() {
    return (
      <div className="container" >
        <div className="row">
          <div className="modal fade" id="ModalEdit" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Edit news</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        value={this.state.valueInput}
                        onChange={this.handleChangeInput}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message-text" className="col-form-label">Message:</label>
                      <textarea
                        className="form-control"
                        id="message-text"
                        value={this.state.valueTextArea}
                        onChange={this.handleChangeTextArea}
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={() => {
                      this.setState({
                        valueInput: '',
                        valueTextArea: '',
                      })
                      return this.props.editNews(this.state.valueInput, this.state.valueTextArea);
                    }
                    }
                  >Edit message</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalEditNews