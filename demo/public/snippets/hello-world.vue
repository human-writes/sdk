<script setup>
defineProps({
    msg: {
        type: String,
        required: true
    }
});
</script>

<template>
    <div class="greetings">
        <text-writer name="text-you-did" speed="40">
            <h2 class="green">{{ msg }}</h2>
        </text-writer>

        <text-writer
            name="text-world"
            depends-on-selector="#ext-you-did"
            speed="40"
        >
            <h3>You’ve successfully created</h3>
            <h3>a project with VueWriterPlugin</h3>
        </text-writer>
    </div>
</template>
