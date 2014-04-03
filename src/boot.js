define([
	'compose',
	'ksf/utils/destroy',
	'ksf/observable/sync/store/DocumentStore',
	'ksf-ui/list/List',
	'ksf-ui/widget/Label',
	'./TodoWidget'
], function(
	compose,
	destroy,
	DocumentStore,
	List,
	Label,
	TodoWidget
) {
	var refDate = new Date();
	var data = {},
		done = true;
	var labels = ["vélo", "velu", "voilà"];
	for (var i = 0; i < 1000; i++) {
		data[i] = {
			desc: labels[i % 3] + i,
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
		// return value1.desc === value2.desc ? 0 : value1.desc < value2.desc ? -1 : 1;
		// return value1.desc.localeCompare(value2.desc);
	});

	var range = sorted.range(0, 20);
	var range2 = sorted.range(20, 70);

	var TestList = compose(List, {
		_itemFactory: function(item) {
			return new TodoWidget(item);
		}
	});
	var list = new TestList(),
		list2 = new TestList();
	
	var count = new Label();
	var storeCount = store.count();
	var storeCountUser = storeCount.withValue(function (value) {
		count.value(value);
	});
	// destroy(storeCountUser);
	
	console.timeEnd('loading');
	
	console.time('list rendering');
	list.content(range);
	list2.content(range2);

	document.body.appendChild(count.domNode);
	document.body.appendChild(list.domNode);
	document.body.appendChild(list2.domNode);

	console.timeEnd('list rendering');

	window.addTask = function() {
		console.time("Ajout d'une tâche");
		store.add({
			desc: "Ah j'oubliais",
			date: new Date("2010/1/1")
		}, Math.random());
		console.timeEnd("Ajout d'une tâche");
	};

	window.removeTask = function(id) {
		console.time("Suppression d'une tâche");
		store.remove(id || 999);
		console.timeEnd("Suppression d'une tâche");
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