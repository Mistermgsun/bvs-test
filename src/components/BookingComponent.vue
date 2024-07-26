<script>
import BookingDateComponent from '../components/BookingDateComponent.vue'
import BookingDayComponent from '../components/BookingDayComponent.vue'

export default {
  components: {
    BookingDateComponent,
    BookingDayComponent
  },
  data() {
    return {
      steps: [
        { number: 1, title: 'Scegli giorno', component: 'BookingDateComponent' },
        { number: 2, title: 'Scegli orario', component: 'BookingDayComponent' },
        { number: 3, title: 'Riepilogo', content: 'Content 2' },
        { number: 4, title: 'Conferma', content: 'Content 3' }
      ],
      activeStep: 1,
      selectedDay: this.getCurrentDay(), // Inizializza con il giorno corrente
      isMobile: window.innerWidth < 992
    }
  },
  computed: {
    currentStep() {
      return this.steps.find((step) => step.number === this.activeStep)
    },
    stepCounter() {
      return `${this.activeStep} / ${this.steps.length}`
    },
    filteredSteps() {
      return this.isMobile ? this.steps : this.steps
    }
  },
  methods: {
    nextStep() {
      if (this.activeStep < this.steps.length) {
        this.activeStep++
      }
    },
    prevStep() {
      if (this.activeStep > 1) {
        this.activeStep--
      }
    },
    stepStatus(step) {
      if (step.number < this.activeStep) {
        return 'completed'
      } else if (step.number === this.activeStep) {
        return 'active'
      }
      return ''
    },
    handleDaySelected(day) {
      this.selectedDay = day // Salva il giorno selezionato
    },
    getCurrentDay() {
      const today = new Date()
      return {
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear()
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth < 992
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<template>
  <div class="booking-form">
    <div class="booking-form__col1">
      <ul class="booking-form__steps">
        <li
          class="booking-form__step"
          v-for="step in steps"
          :key="step.number"
          :class="stepStatus(step)"
        >
          <div class="booking-form__step__icon">
            <template v-if="stepStatus(step) === 'completed'">
              <font-awesome-icon :icon="['fas', 'check']" />
            </template>
            <template v-else>
              {{ step.number }}
            </template>
          </div>
          <p class="booking-form__step__title" v-if="!isMobile">{{ step.title }}</p>
        </li>
      </ul>
    </div>
    <div class="booking-form__col2">
      <div class="booking-form__header">
        <p class="booking-form__step-title">{{ currentStep.title }}</p>
      </div>
      <div class="booking-form__contents">
        <component
          :is="currentStep.component"
          @day-selected="handleDaySelected"
          :selected-day="selectedDay"
        ></component>
      </div>
      <div class="booking-form__navigation">
        <button
          class="booking-form__button booking-form__prev"
          @click="prevStep"
          v-if="activeStep > 1"
        >
          Precedente
        </button>
        <button class="booking-form__button booking-form__next" @click="nextStep">
          {{ activeStep < steps.length ? 'Successivo' : 'Conferma' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/functions.scss';

.booking-form {
  max-width: var(--booking-form-width);
  width: 100%;
  border-radius: 10px;
  display: flex;

  &__col1 {
    padding: responsive-size(3, 1);
    width: 230px;
    height: 100%;
    background-color: var(--seventh-color);
    box-sizing: border-box;
    border: 1px solid var(--seventh-color);
  }

  &__col2 {
    height: 100%;
    width: calc(100% - 230px);
    background-color: var(--eight-color);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  &__steps {
    list-style-type: none;
    padding: 0px;
    margin: 0px;
  }

  &__step {
    display: flex;
    align-items: center;
    margin-bottom: 2.8rem;

    &:last-child {
      margin-bottom: 0rem;
    }

    &__icon {
      width: responsive-size(2.2, 1.7, var(--page-width-val-m));
      height: responsive-size(2.2, 1.7, var(--page-width-val-m));
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin-right: 1rem;
      background-color: var(--ninth-color);
      font-weight: 500;
      font-size: responsive-size(1.2, 1, var(--page-width-val-m));
      color: var(--primary-color);
    }

    &__title {
      color: var(--tenth-color); /* Colore delle voci successive */
      line-height: 1;
      font-size: responsive-size(1.5, 1.4);
    }

    &.active {
      .booking-form__step__icon {
        background-color: var(--eleventh-color); /* Colore differente per l'icona attiva */
      }

      .booking-form__step__title {
        color: var(--eleventh-color); /* Colore del testo attivo */
      }
    }

    &.completed {
      .booking-form__step__icon {
        background-color: var(--twelfth-color); /* Colore sfondo step completato */
      }

      .booking-form__step__title {
        color: var(--primary-color); /* Colore titolo step completato */
      }
    }
  }

  &__header {
    box-sizing: border-box;
    padding-left: responsive-size(3, 1.2);
    padding-right: responsive-size(3, 1.2);
    padding-top: 0rem;
    padding-top: 0rem;
    height: var(--booking-form-header-height);
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid var(--thirteenth-color);
    background-color: var(--primary-color);
  }

  &__step-title {
    color: #292d32;
    font-size: responsive-size(1.8, 1.2);
  }

  &__contents {
    box-sizing: border-box;
    border-right: 1px solid var(--thirteenth-color);
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: var(--booking-form-content-height);
    max-height: var(--booking-form-content-height);
    z-index: 0;
  }

  &__navigation {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid var(--thirteenth-color);
    position: relative;
    min-height: var(--booking-form-navigation-height);
    background-color: var(--primary-color);
    z-index: 1;
  }

  .booking-form__button {
    padding: 1rem 1.5rem;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    outline: none;
    text-transform: uppercase;
    font-weight: 500;
    font-size: responsive-size(1.3, 1.1);
    border-width: 1px;
    border-style: solid;
    transition-duration: 0.4s;

    &:hover {
      cursor: pointer;
    }
  }

  .booking-form__prev {
    left: 30px;
    background-color: var(--sixtheenth-color);
    border-color: var(--fourtheenth-color);
    color: var(--fiftheenth-color);
    opacity: 0.85;
  }

  .booking-form__next {
    right: 30px;
    background-color: var(--twelfth-color);
    color: var(--primary-color);
    border-color: var(--twelfth-color);
  }

  @media only screen and (max-width: 992px) {
    flex-direction: column;

    &__col1 {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: auto;
    }

    &__col2 {
      width: 100%;
    }

    &__steps {
      display: flex;
      align-items: center;
    }

    &__step {
      margin-bottom: 0px;
    }

    &__contents {
      border-left: 1px solid var(--thirteenth-color);
      border-right: 1px solid var(--thirteenth-color);
    }

    .booking-form__step__title {
      display: none; /* Nasconde i titoli degli step su mobile */
    }
  }
}
</style>
