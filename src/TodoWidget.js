define([
	'compose',
	'ksf/utils/destroy',
	'ksf/dom/composite/CompositeBase',
	'ksf-ui/layout/Flow',
	'ksf-ui/widget/editable/Date',
	'ksf-ui/widget/editable/Checkbox',
	'ksf-ui/widget/editable/Text',
	'kss!./todo-widget.css'
], function(
	compose,
	destroy,
	CompositeBase,
	FlowLayout,
	Date,
	Checkbox,
	Text,
	todoStyle
){
	return compose(CompositeBase, {
		_rootFactory: function() { return new FlowLayout(); }
	}, function(acc) {
		this._label = new Text();
		this._label.on('input', function(desc) {
			this._todo.prop('desc').value(desc);
		}.bind(this));
		this._date = new Date();
		this._date.on('input', function(date) {
			this._todo.prop('date').value(date);
		}.bind(this));
		this._done = new Checkbox();
		this._done.on('input', function(checked) {
			this._todo.prop('done').value(checked);
		}.bind(this));

		this._root.content([
			this._label,
			this._date,
			this._done
		]);

		acc && this.todo(acc);
		todoStyle.apply(this.domNode);
	}, {
		todo: function(todo) {
			destroy(this._todoCancelers);
			this._todo = todo;

			this._value(todo.value());
			this._todoCancelers = [
				todo.on('value', this._value.bind(this))
			];
		},
		_value: function(value) {
			this._label.value(value.desc);
			this._date.value(value.date);
			this._done.value(value.done);
		}
	});
});