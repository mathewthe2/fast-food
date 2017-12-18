import React, { Component } from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

import './DialogStyles.css';

import PropTypes from 'prop-types';

class MSDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
        };


        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen = () => {
      this.setState({hidden: false});
      this.props.valueLink.requestChange(false);
    }

    handleClose = () => {
        this.setState({hidden: true});
        this.props.valueLink.requestChange(true);
    };

    componentWillReceiveProps = (nextProps) => {
      this.setState({
        hidden: nextProps.valueLink.value
    });

    }


    render() {

        return (
          <div>
          {/* <DefaultButton
            description='Opens the Sample Dialog'
            onClick={ this.handleOpen }
            text={this.props.buttonTitle}
          /> */}
          <Dialog
            hidden={ this.state.hidden }
            onDismiss={ this.handleClose }
            dialogContentProps={ {
              type: DialogType.largeHeader,
              title: this.props.title,
              subText: this.props.instruction || ''
            } }
            modalProps={ {
              isBlocking: false,
              containerClassName: 'ms-dialogMainOverride'
            } }
          >
            {this.props.children}
            <DialogFooter>
              <PrimaryButton onClick={ this.handleClose } text='Save' />
              <DefaultButton onClick={ this.handleClose } text='Cancel' />
            </DialogFooter>
          </Dialog>
        </div>
        );
    }
}


Dialog.propTypes = {
    // title: PropTypes.string.isRequired,
    // children: PropTypes.element.isRequired
}

export default MSDialog;