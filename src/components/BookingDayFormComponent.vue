<script>
import CustomTimeInputComponent from './CustomTimeInputComponent.vue'

export default {
  name: 'BookingDayFormComponent',
  components: {
    CustomTimeInputComponent
  },
  props: {
    selectedDay: {
      type: Object,
      required: true
    },
    startHour: {
      type: Number,
      required: true
    },
    endHour: {
      type: Number,
      required: true
    },
    minBookingTime: {
      type: Number,
      required: true
    }
  },
  data() {
    const today = new Date()
    const formattedDate = this.formatDate(this.selectedDay)
    const formattedInputDate = this.formatInputDate(this.selectedDay)
    const minDate = this.formatInputDate({
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate()
    })

    const currentMinutes = today.getMinutes()
    const roundedMinutes = Math.ceil(currentMinutes / 5) * 5
    today.setMinutes(roundedMinutes)
    const startTime = this.formatTime(today)
    today.setMinutes(today.getMinutes() + this.minBookingTime)
    const endTime = this.formatTime(today)

    return {
      formData: {
        day: formattedInputDate,
        firstName: '',
        lastName: '',
        startTime: startTime,
        endTime: endTime
      },
      formattedDate: formattedDate,
      minDate: minDate,
      endMinTime: endTime
    }
  },
  watch: {
    formData: {
      handler() {
        this.validateFormData()
      },
      deep: true
    }
  },
  computed: {
    startHourFormatted() {
      return `${this.startHour.toString().padStart(2, '0')}:00`
    },
    endHourFormatted() {
      return `${this.endHour.toString().padStart(2, '0')}:00`
    },
    maxStartTime() {
      const endHourMinusMinBooking = this.endHour * 60 - this.minBookingTime
      const hours = Math.floor(endHourMinusMinBooking / 60)
      const minutes = endHourMinusMinBooking % 60
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    },
    maxStartMinutes() {
      return 60 - this.minBookingTime
    }
  },
  methods: {
    validateFormData() {
      const isValid =
        this.formData.firstName.trim() !== '' &&
        this.formData.lastName.trim() !== '' &&
        this.formData.startTime !== '' &&
        this.formData.endTime !== ''
      this.$emit('form-valid', isValid)
    },
    formatDate(selectedDay) {
      const monthsOfYear = [
        'Gennaio',
        'Febbraio',
        'Marzo',
        'Aprile',
        'Maggio',
        'Giugno',
        'Luglio',
        'Agosto',
        'Settembre',
        'Ottobre',
        'Novembre',
        'Dicembre'
      ]

      const daysOfWeek = [
        'Domenica',
        'Lunedì',
        'Martedì',
        'Mercoledì',
        'Giovedì',
        'Venerdì',
        'Sabato'
      ]

      const date = new Date(selectedDay.year, selectedDay.month, selectedDay.day)
      const dayOfWeek = daysOfWeek[date.getDay()]

      const day = selectedDay.day
      const month = monthsOfYear[selectedDay.month]
      const year = selectedDay.year

      return `${dayOfWeek} ${day} ${month} ${year}`
    },
    formatInputDate(selectedDay) {
      const month = selectedDay.month + 1
      const formattedMonth = month < 10 ? `0${month}` : month
      const day = selectedDay.day < 10 ? `0${selectedDay.day}` : selectedDay.day
      const year = selectedDay.year

      return `${year}-${formattedMonth}-${day}`
    },
    updateFormattedDate() {
      const [year, month, day] = this.formData.day.split('-').map(Number)
      const newDate = {
        year: year,
        month: month - 1,
        day: day
      }
      this.formattedDate = this.formatDate(newDate)
      this.validateFormData()
    },
    updateEndTimeOptions(newStartTime) {
      const [startHours, startMinutes] = newStartTime.split(':').map(Number)
      let endMinTime = new Date()
      endMinTime.setHours(startHours, startMinutes + this.minBookingTime, 0, 0)
      this.endMinTime = this.formatTime(endMinTime)
      this.formData.endTime = this.endMinTime
      this.validateFormData()
    },
    formatTime(date) {
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `${hours}:${minutes}`
    }
  },
  mounted() {
    this.validateFormData() // Verifica iniziale dei dati
  }
}
</script>

<template>
  <div class="booking-form">
    <p class="booking-form__title">Nuova prenotazione - {{ formattedDate }}</p>
    <div class="booking-form__field">
      <label for="day">Giorno</label>
      <input
        type="date"
        id="day"
        v-model="formData.day"
        @change="updateFormattedDate"
        :min="minDate"
        required
      />
    </div>
    <div class="booking-form__row">
      <div class="booking-form__field">
        <label for="firstName">Nome</label>
        <input type="text" id="firstName" v-model="formData.firstName" required />
      </div>
      <div class="booking-form__field">
        <label for="lastName">Cognome</label>
        <input type="text" id="lastName" v-model="formData.lastName" required />
      </div>
    </div>
    <div class="booking-form__row">
      <div class="booking-form__field">
        <label for="startTime">Orario di Inizio</label>
        <custom-time-input-component
          v-model="formData.startTime"
          :min-time="startHourFormatted"
          :max-time="maxStartTime"
          :step="5"
          :max-start-minutes="maxStartMinutes"
          @update:modelValue="updateEndTimeOptions"
        />
      </div>
      <div class="booking-form__field">
        <label for="endTime">Orario di Fine</label>
        <custom-time-input-component
          v-model="formData.endTime"
          :min-time="endMinTime"
          :max-time="endHourFormatted"
          :step="5"
          :restrict-end-hour="true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.booking-form {
  box-sizing: border-box;
  padding: 3rem;
  width: 100%;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;

  &__title {
    margin-bottom: 2rem;
  }

  &__row {
    display: flex;
    gap: 2rem;
  }

  &__field {
    margin-bottom: 2rem;
    width: 100%;
  }

  label {
    display: flex;
    margin-bottom: 0.8rem;
  }

  input,
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
  }

  &__button {
    width: fit-content;
  }
}
</style>
