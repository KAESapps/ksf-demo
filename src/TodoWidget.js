define([
	'compose',
	'ksf/dom/composite/CompositeBase',
	'ksf-ui/layout/Flow',
	'ksf-ui/widget/editable/Date',
	'ksf-ui/widget/editable/Checkbox',
	'ksf-ui/widget/editable/ShortText',
	'ksf-ui/widget/Button',
	'kss!./todo-widget.css'
], function(
	compose,
	CompositeBase,
	FlowLayout,
	Date,
	Checkbox,
	Text,
	Button,
	todoStyle
){
	return compose(CompositeBase, {
		_rootFactory: function() { return new FlowLayout(); }
	}, function(todo) {
		var deleteBtn = new Button("x");
		deleteBtn.on('pushed', function() {
			todo.delete();
		});
		this._root.content([
			new Text(todo.prop('desc')),
			new Date(todo.prop('date')),
			new Checkbox(todo.prop('done')),
			deleteBtn
		]);

		todoStyle.apply(this.domNode);
		this.domNode.id = todo._propName;
	});
});