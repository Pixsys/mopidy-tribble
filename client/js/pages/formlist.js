/** @jsx React.DOM */
var React = require('react');
var DatePicker = require('../components/datepicker');

var FormList =
    React.createClass({
        render:function(){
            return (
                <div>
                    <h1>Form List View</h1>
                    <DatePicker />
                </div>
            );
        }
    });

module.exports = FormList;