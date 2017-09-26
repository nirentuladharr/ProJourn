var store = {
    state: {
        activeJournal: 1
    }
};



$journals = Vue.component('journals', {
    template: `
    <div>
        <form method="GET" @submit.prevent="createJournal" class="add-new-journal-container">
            <input type="text" v-model="name" class="add-new-journal-textbox">
            <button class="button">Add a new journal</button>
        </form>
        <div id="tasks-template">
            <ul>
                <li v-for="journal in journals">
                    <a href="#" @click="showID(journal.id)"><i class="fa fa-file-o journal-heading-icon" aria-hidden="true"></i>
                        {{ journal.name }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
    `,
    data: function() {
        return {
            name: '',
            journals: {
                id: '',
                name: ''
            },
            activeJournal: store.state.activeJournal
        }
    },
    created: function() {
        this.fetchJournals();
        console.log(this.activeJournal);
    },
    methods: {
        fetchJournals: function () {
            axios.get('api/journals')
                .then(response => this.journals = response.data);
        },
        createJournal: function() {
            axios.post('api/newJournal', { name: this.name })
                .then(response => console.log(response))
                .catch(function (error) { console.log('JOURNAL -> ' + error.message) });
            this.fetchJournals();
        }
    }
})


Vue.component('journal-entries', {
    template: `
    <div>
        <form method="GET" @submit.prevent="createJournalEntry" class="add-new-journal-container">
            <input type="text" v-model="name" class="add-new-journal-textbox">
            <button class="button">Add a new entry</button>
        </form>
        <ul>
            <li v-for="journalEntry in journalEntries">
                <a href="#">{{ journalEntry.title }}</a>
            </li>
        </ul>
    </div>
    `,
    data: function () {
        return {
            name: '',
            journalEntries: []
        }
    },
    created: function () {
        this.fetchJournalEntries();
    },
    methods: {
        createJournalEntry: function () {
            axios.post('api/newJournalEntry', { name: this.name })
                .then(response => console.log(response))
                .catch(function (error) { console.log('JOURNAL -> ' + error.message) });
        },
        fetchJournalEntries: function () {
            axios.get('api/journalEntries')
                .then(response => this.journalEntries = response.data)
                // .then(response => console.log(response))
                .catch(function (error) { console.log('JOURNAL ENTRY -> ' + error.message) });
            // console.log(this.journalEntries);
        }
    }
})


new Vue({
    el: '#root'
})