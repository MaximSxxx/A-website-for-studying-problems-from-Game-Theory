<template>
    <h1>v0.1 КОНСТРУКТОР ЗАДАЧИ С ОДНОЙ КУЧЕЙ</h1>
    <h1>Задача с одной кучей</h1>

    <p>Перед вами куча камней(S). <br> Вы играете против компьютера. <br> Ходы делаются поочередно. <br> За один ход можно: <br>
    <div class = "actions" v-for ="action in actions">
    <div><strong>{{action}}</strong></div>
    </div> 
    Вы сами устанавливаете начальное и победное количество камней.<br> 
    Выиграет тот, кто первый наберет макимальное количество камней в куче.</p>

    <form @submit.prevent="saveValue">
        <input type="number" v-model="maximumS" placeholder="max S = ">
        <input type="number" v-model="startS" placeholder="start S = ">
        <button type="button" @click="saveValue">Принять</button>
    </form>

    <div v-if="showAdditionalButtons">
    <div class = "heap"><h1>{{this.currentS}}</h1></div>
        <button v-for="(action, index) in actions":key="index"
        @click="performAction(index)">{{action}}</button>
    </div>
</template>

<<script>
export default {
    data() {
       return {
            actions: [(S) => S + 1, (S) => S + 3, (S) => S * 2],
            startS: null,
            maximumS: null,

            currentS: null,
            showAdditionalButtons: false,
    };
    },
   methods: {
    saveValue() {
        this.showAdditionalButtons = true;
        this.currentS = this.startS; 
        this.maximumS = this.maximumS; 
    },
    performAction(index) {
        const action = this.actions[index];
        if (action) {
        this.currentS = action(this.currentS);
        console.log(this.currentS);}
    },
  },
}
</script>

<style>

</style>