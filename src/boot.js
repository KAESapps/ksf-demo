define([
	'compose',
	'ksf/observable/sync/store/DocumentStore',
	'ksf-ui/list/List',
	'./TodoWidget'
], function(
	compose,
	DocumentStore,
	List,
	TodoWidget
) {
	var refDate = new Date();
	var data = {},
		done = true;
	for (var i = 0; i < 1000; i++) {
		data[i] = {
			desc: "faire les courses",
			done: done,
			date: new Date(refDate - 24 * 3600 * 1000 * i)
		};
		done = !done;
	}

	console.time('loading');
	var store = window.store = new DocumentStore(data);

	var filtered = store.filter(function(value) {
		return !value.done;
	});
	
	var sorted = filtered.sort(function(value1, value2) {
		return value1.date && value2.date && value1.date.valueOf() - value2.date.valueOf();
	});

	var list = new (compose(List, {
		_itemFactory: function(item) {
			return new TodoWidget(item);
		}
	}))();
	console.timeEnd('loading');
	
	console.time('list rendering');
	list.content(sorted);
	console.timeEnd('list rendering');

	document.body.appendChild(list.domNode);

	window.addTask = function() {
		console.time("Ajout d'une tâche");
		store.add({
			desc: "Ah j'oubliais",
			date: new Date("2010/1/1")
		}, Math.random());
		console.timeEnd("Ajout d'une tâche");
	};

	window.getSortedValue = function() {
		console.time("sorted.value()");
		sorted.value();
		console.timeEnd("sorted.value()");
	};

	window.setDone = function() {
		console.time("set done");
		store.item('999').prop('done').value(true);
		console.timeEnd("set done");
	};
});