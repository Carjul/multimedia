<template>
    <Nav />
    <div class="flex flex-wrap justify-center gap-4 mt-5">
        <div v-for="(person, index) in people"
             :key="index"
             class="card bg-base-100 w-96 shadow-xl">
            <figure class="px-10 pt-10">
                <img :src="person.image"
                     alt="Person Image"
                     class="rounded-xl" 
                     loading="lazy"
                     />
                
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">{{ person.nombre }}</h2>
                <div class="card-actions">
                    <button class="btn btn-primary">View Profile</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const people = ref([
        { nombre: 'Angel Antonio Solar Esalas', image: 'https://robohash.org/4' },
        { nombre: 'Katerine Paola Calao Polo', image: 'https://robohash.org/1' },
        { nombre: 'Elkin Ricardo Lopez Castillo', image: 'https://robohash.org/400' },
        { nombre: 'Aldair Delgado Sanchez', image: 'https://robohash.org/6' },
        { nombre: 'Michael Steven Barrios Martinez', image: 'https://robohash.org/9' },
        { nombre: 'Jose Julian Diaz Colin', image: 'https://robohash.org/8' },
        { nombre: 'Valentina Sierra Gloria', image: 'https://robohash.org/7' },
    ]);
</script>
