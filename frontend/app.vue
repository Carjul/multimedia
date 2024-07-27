<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script>
    export default {
        mounted() {
            function setTheme(theme) {
                document.documentElement.setAttribute('data-theme', theme);
            }
            setTheme('corporate');
        }
    }
</script>
