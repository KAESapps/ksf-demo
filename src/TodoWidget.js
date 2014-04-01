define([
	'compose',
	'ksf/utils/destroy',
	'ksf/dom/composite/CompositeBase',
	'ksf-ui/layout/Flow',
	'ksf-ui/widget/Label',
	'ksf-ui/widget/editable/Checkbox',
	'kss!./todo-widget.css'
], function(
	compose,
	destroy,
	CompositeBase,
	FlowLayout,
	Label,
	Checkbox,
	todoStyle
){
	return compose(CompositeBase, {
		_rootFactory: function() { return new FlowLayout(); }
	}, function(acc) {
		this._label = new Label();
		this._date = new Label();
		this._done = new Checkbox();
		this._done.on('toggle', function(checked) {
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
			this._date.value(value.date.toLocaleDateString());
			this._done.value(value.done);
		}
	});
});