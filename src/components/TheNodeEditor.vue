<script setup>
import { reactive, computed, ref, watch, nextTick } from "vue";

const props = defineProps([ "active", "targetNode", "settings" ]);
const emit = defineEmits([ "editionEnded" ]);

const inputField = ref(null);

const editionState = reactive({
	content: ""
});
watch(() => props.active, value => {
	if (value)
	{
		onBecomeActive();
	}
});

const view = computed(() => {
	return {
		x: props.targetNode?.x ?? 0,
		y: (props.targetNode?.y ?? 0) - props.settings.leaveHeight / 4
	};
});

function onBecomeActive()
{
	editionState.content = props.targetNode.content;
	nextTick(() => {
		inputField.value.focus();
		inputField.value.select();
	});
}

function onNodeInputCancel(event)
{
	event?.preventDefault();
	event?.stopPropagation();

	emit("editionEnded");
}

function onNodeInputValidate(event)
{
	event?.preventDefault();
	event?.stopPropagation();

	const newContent = editionState.content.trim();
	if (newContent !== "")
	{
		emit("editionEnded", {
			content: newContent
		});
	}
}
</script>

<template>
	<foreignObject
		v-show="props.active"
		:x="view.x"
		:y="view.y"
		:width="300"
		:height="props.settings.leaveHeight / 2">
		<input
			id="map-input"
			ref="inputField"
			type="text"
			v-model="editionState.content"
			@keypress.enter="onNodeInputValidate($event)"
			@keydown.esc="onNodeInputCancel($event)" />
	</foreignObject>
</template>

<style>
#map-input
{
	margin: 0;
	padding: 0;
	width: calc(100% - 8px);
	height: calc(100% - 6px);

	border: 1px solid black;
	outline: none;
}
</style>