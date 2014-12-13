/** @jsx React.DOM */
var React = require('react');
var Moment = require('moment');
var AppStore = require('../stores/ff-store.js');
var AppActions = require('../actions/ff-actions.js');

var inputs = [];
var pickers = [];

var DatePicker =
    React.createClass({
        getInitialState: function() {
            return AppStore.getState();
        },
        componentDidMount: function() {
            console.log("The daterange: ", this.state.daterange);

            setupDatePickers(this.state.daterange);
        },

        componentWillUnmount: function() {
            AppStore.removeChangeListener(this._onChange);
        },

        componentWillMount:function(){
            AppStore.addChangeListener(this._onChange);
        },

        _onChange:function(){
            this.setState(AppStore.getState());
        },

        componentDidUpdate: function() {
            console.log("Component updated",this.state);
            //setupDatePickers(this.state.daterange);
        },
        handleApplyDaterange: function() {
            AppActions.applyDaterange();
        },
        render:function(){
            return (
                <div>
                    <input type="text" className="datepicker-from" />
                    <input type="text" className="datepicker-to" />
                    <a href="javascript:void(0);" onClick={this.handleApplyDaterange}>Apply</a>
                </div>
            );
        }
    });

function setupDatePickers(daterange) {

    inputs = [];
    inputs.push($('.datepicker-from').pickadate());
    inputs.push($('.datepicker-to').pickadate());

    pickers = [];
    pickers.push(inputs[0].pickadate('picker'));
    pickers.push(inputs[1].pickadate('picker'));

    pickers[0].set('select', new Date(daterange.from));
    pickers[1].set('select', new Date(daterange.to));

    pickers[0].on({set: updateFrom });
    pickers[1].on({set: updateTo});
}

function updateFrom(date) {
    AppActions.updateDaterangeFrom(date.select);
}

function updateTo(date) {
    AppActions.updateDaterangeTo(date.select);
}

module.exports = DatePicker;