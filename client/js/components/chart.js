/** @jsx React.DOM */
var React = require('react');
var c3 = require('c3');

var Chart =
    React.createClass({
        componentDidMount: function() {
            var chart = c3.generate({
                bindto: '#'+this.props.id,
                data: this.props.data,
                color: {
                    pattern: ['#39BBA6', '#FAD146', '#39B2D2', '#EE7837']
                },
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                },
                axis: {
                    y: {
                        padding: {
                            left: 0,
                            right: 0,
                        }
                    },
                    x: {
                        tick: {
                            fit: false
                        }
                    }

                },
                grid: {
                    x: {
                        lines: false
                    }
                }

            });
        },
        render:function(){
            return (
                <div id={this.props.id} className="chart">
                </div>
            );
        }
    });

module.exports = Chart;