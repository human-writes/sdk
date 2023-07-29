<script setup>
import  "human-writes/style.css"
</script>

<template>
    <div>
        <div class="v-margin">
            <p>&nbsp;</p>
        </div>
        <div>
            <text-writer
                depends-on-selector="div[name='text-world']"
                name="text-intro"
                source="/texts/ad.html"
                speed="40"
            />
        </div>
        <div>
            <code-writer
                depends-on-selector="div[name='text-intro']"
                language="javascript"
                source="/snippets/hello-world.vue"
                speed="50"
                v-bind:use-highlight-js="true"
            />
        </div>
        <div class="v-margin">
            <p>&nbsp;</p>
        </div>
    </div>
</template>
<style scoped>
.v-margin {
    min-height: 4vh;
}

h1 {
    font-weight: 500;
    font-size: 2.6rem;
    position: relative;
    top: -10px;
}

h3 {
    font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
    text-align: center;
}

@media (min-width: 1024px) {
    .v-margin {
        min-height: calc((100vh - 700px) / 2);
    }

    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>
